import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../requests/login-request';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtAuth } from '../models/jwtAuth';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loginUrl = "authentication/login"

  constructor(private http: HttpClient) {
  }

  public login(request: LoginRequest, headers: HttpHeaders): Observable<JwtAuth>{
    
    return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.loginUrl}`, request, { headers: headers})
  }

  public isAuthorizedAsAdmin(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      
      if(token)
      {
        const jwtHelper = new JwtHelperService();
        if(!jwtHelper.isTokenExpired(token))
        {
          const decodedToken = jwtHelper.decodeToken(token);
          const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
          if(roles === 'Administrator')
          {
            return true;
          }
        }
        else{
          return false;
        }
      }
    }

  return false;
  }

  public isAuthorizedAsDelivery(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      
      if(token)
      {
        const jwtHelper = new JwtHelperService();
        if(!jwtHelper.isTokenExpired(token))
        {
          const decodedToken = jwtHelper.decodeToken(token);
          const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
          if(roles === 'Delivery')
          {
            return true;
          }
        }
        else{
          return false;
        }
      }
    }

  return false;
  }

  public isAuthorizedAsSeller(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      
      if(token)
      {
        const jwtHelper = new JwtHelperService();
        if(!jwtHelper.isTokenExpired(token))
        {
          const decodedToken = jwtHelper.decodeToken(token);
          const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
          if(roles === 'Seller')
          {
            return true;
          }
        }
        else{
          return false;
        }
      }
    }

  return false;
  }

  isAuthorized(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      
      if(token)
      {
        const jwtHelper = new JwtHelperService();
        if(!jwtHelper.isTokenExpired(token))
        {
          return true;
      }
    }
  }
  return false;
}
}
