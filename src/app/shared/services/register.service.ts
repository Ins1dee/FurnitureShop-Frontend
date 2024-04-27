import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../requests/register-request';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfirmRegistrationRequest } from '../requests/confirm-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerUrl = "registration"
  confirmUrl = "registration/confirm-user"

  constructor(private http: HttpClient) { }

  public register(request: RegisterRequest): Observable<string>{
    
    return this.http.post<string>(`${environment.apiUrl}/${this.registerUrl}`, request)
  }

  public confirm(request: ConfirmRegistrationRequest): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.confirmUrl}`, request);
  }
}
