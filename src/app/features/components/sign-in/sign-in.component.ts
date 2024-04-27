import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginRequest } from '../../../shared/requests/login-request';
import { JwtAuth } from '../../../shared/models/jwtAuth';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import * as uuid from 'uuid';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommunicationService } from '../../../shared/services/communication.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  jwt = new JwtAuth();
  errorMessage: string = '';

  httpHeaders: HttpHeaders = new HttpHeaders()
    .set('X-Idempotency-Key', uuid.v4());

  constructor(private authService: AuthService, private router: Router, private communicationService: CommunicationService) {}

  onRegisterClick() {
    this.communicationService.triggerRegisterButtonClick();
  }

  submit() {
    const val = this.form.value;

    const loginRequest: LoginRequest = {
      email: val.email,
      password: val.password
    };

    if (this.form.valid) {
      this.authService.login(loginRequest, this.httpHeaders).subscribe(
        (jwtAuth) => {
          if (jwtAuth.accessToken != null) {
            localStorage.setItem('jwtToken', jwtAuth.accessToken);
          }

          const jwtHelper = new JwtHelperService();
          const decodedToken = jwtHelper.decodeToken(jwtAuth.accessToken);
          const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
          const modal = document.getElementById('loginModal');
        if (modal) {
          modal.classList.remove('show');
          modal.removeAttribute('data-bs-backdrop');
          modal.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('modal-open');

          // Remove the modal backdrop
          const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
          if (modalBackdrop) {
            modalBackdrop.classList.remove('modal-static');
            modalBackdrop.remove();
          }
        }
          if(roles === 'Administrator')
          {
            this.router.navigateByUrl('/admin');
          }
          if(roles === 'Customer')
          {
            this.router.navigateByUrl('');
          }

        },
        (error) => {
          this.errorMessage = error.error.message;

          this.httpHeaders = this.httpHeaders.set('X-Idempotency-Key', uuid.v4());
        }
      );
    }
  }
}
