import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree  } from '@angular/router';
import jwt_decode,{ JwtPayload } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor() { }

  IsloggedIn( requiredRole : string)
  {
   
    const token = localStorage.getItem('token');

    if(token)
    {
      
      const decodedToken: any  = jwt_decode(token);

      
      if(decodedToken.Roles.includes(requiredRole))
      {
       
        return true;
      }
    
    }
    return false;
  }
}
