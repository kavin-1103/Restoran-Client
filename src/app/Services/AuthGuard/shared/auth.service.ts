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
    console.log(requiredRole);
    const token = localStorage.getItem('token');

    if(token)
    {
      console.log(token);
      const decodedToken: any  = jwt_decode(token);
      //console.log();
      
      if(decodedToken.Roles.includes(requiredRole))
      {
        console.log(decodedToken.Roles);
        return true;
      }
      // const roles: string[] = decodedToken.role;
      // console.log(roles);
      // if(decodedToken === requiredRole)
      // {
      //   return true;
      // }
    }
    return false;
  }
}
