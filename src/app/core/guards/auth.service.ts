import { Injectable } from '@angular/core';
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
