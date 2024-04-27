import { Component, ViewChild  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../../shared/services/register.service';
import { ConfirmRegistrationRequest } from '../../../shared/requests/confirm-request';
import { RegisterRequest } from '../../../shared/requests/register-request';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginRequest } from '../../../shared/requests/login-request';
import { HttpHeaders } from '@angular/common/http';
import * as uuid from 'uuid';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  createdUserId = "";
  errorMessage = "";
  digit1: string = '';
  digit2: string = '';
  digit3: string = '';
  digit4: string = '';
  digit5: string = '';
  digit6: string = '';
  httpHeaders: HttpHeaders = new HttpHeaders()
  .set('X-Idempotency-Key', uuid.v4());

 
  constructor(private registerService: RegisterService, private router: Router, private authService: AuthService) {}

  allDigitsEntered(): boolean {
     
    if(this.digit1 && this.digit2 && this.digit3 && this.digit4 && this.digit5 && this.digit6)
    {
      return true;
    }

     return false;
  }

  submit() {
    const val = this.form.value;

    const registerRequest: RegisterRequest = {
      firstname: val.firstname,
      lastname: val.lastname,
      email: val.email,
      password: val.password,
      role: val.role
    };
    
    if (this.form.valid) {
      this.registerService.register(registerRequest).subscribe(
        (response) => {
          if (response != null) {
            this.createdUserId = response;
          }
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  confirm(){
    const concatenatedCode = this.digit1 + this.digit2 + this.digit3 + this.digit4 + this.digit5 + this.digit6;

    const confirmRequest: ConfirmRegistrationRequest = {
      userRegistrationId: this.createdUserId,
      confirmationCode: concatenatedCode
    }

    this.registerService.confirm(confirmRequest).subscribe(
      () => {

        const val = this.form.value;

        const loginRequest: LoginRequest = {
          email: val.email,
          password: val.password
        };

        this.authService.login(loginRequest, this.httpHeaders).subscribe(
          (jwtAuth) => {
            if (jwtAuth.accessToken != null) {
              localStorage.setItem('jwtToken', jwtAuth.accessToken);
            }
              this.router.navigateByUrl('');
          },
          (error) => {
            this.errorMessage = error.error.message;
  
            this.httpHeaders = this.httpHeaders.set('X-Idempotency-Key', uuid.v4());
          }
        );
        const confirmationModal = document.getElementById('confirmationModal');
        if (confirmationModal) {
          confirmationModal.classList.remove('show');
          confirmationModal.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('modal-open');

          // Remove the modal backdrop
          const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
        }
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}

