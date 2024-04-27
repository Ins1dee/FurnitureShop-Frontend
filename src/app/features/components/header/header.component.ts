import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SignInComponent } from "../sign-in/sign-in.component";
import { CommunicationService } from '../../../shared/services/communication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { RegisterService } from '../../../shared/services/register.service';
import { Router  } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { RegisterRequest } from '../../../shared/requests/register-request';
import { ConfirmRegistrationRequest } from '../../../shared/requests/confirm-request';
import { LoginRequest } from '../../../shared/requests/login-request';
import * as uuid from 'uuid';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [SignInComponent, FormsModule, ReactiveFormsModule, CommonModule]
})
export class HeaderComponent implements OnInit {

  @ViewChild('registerButton') registerButton!: ElementRef;

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

 
  constructor(private communicationService: CommunicationService,
    private registerService: RegisterService,
    private router: Router,
    private authService: AuthService) {
    }

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

    console.log(registerRequest);
    
    if (this.form.valid) {
      this.registerService.register(registerRequest).subscribe(
        (response) => {
          if (response != null) {
            this.createdUserId = response;
          }
        },
        (error) => {
          this.errorMessage = "Email is already taken";
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
          confirmationModal.removeAttribute('data-bs-backdrop');
          confirmationModal.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('modal-open');

          // Remove the modal backdrop
          const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
          if (modalBackdrop) {
            modalBackdrop.classList.remove('modal-static');
            modalBackdrop.remove();
          }
          this.router.navigateByUrl('');
        }
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

  isAuthorizedAsAdmin(): boolean {
    return this.authService.isAuthorizedAsAdmin();
  }

  isAuthorized(): boolean {
    return this.authService.isAuthorized();
  }

  ngOnInit(): void {
    this.communicationService.registerButtonClick$.subscribe(() => {
      // Handle the event here, e.g., trigger a button click
      this.handleRegisterButtonClick();
    });
  }

  handleRegisterButtonClick() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
      loginModal.classList.remove('show');
      loginModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');

      // Remove the modal backdrop
      const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }

    this.registerButton.nativeElement.click();
  }
}
