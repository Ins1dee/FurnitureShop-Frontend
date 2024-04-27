import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  
  constructor(private router: Router) { }

  public isAuthorized(): boolean {
    if(localStorage)
    {
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
  
    this.router.navigateByUrl("/unauthorized");
    return false;
  }

  public hasSellerPermission() : boolean {
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
          this.router.navigateByUrl("/unauthorized");
          return false;
        }
      }
    }

  this.router.navigateByUrl("/forbidden");
  return false;
  }

  public hasAdminPermission(): boolean {

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
          this.router.navigateByUrl("/unauthorized");
          return false;
        }
      }
    }

  this.router.navigateByUrl("/forbidden");
  return false;
  }
}
