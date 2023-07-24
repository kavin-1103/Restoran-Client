import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot,UrlTree } from '@angular/router';

import { Router } from '@angular/router';
import { inject} from '@angular/core';

import { AuthService } from './auth.service';


export const authguardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | UrlTree => {
    //const auth = new AuthService();
  //  const router = new Router();
  const auth = inject(AuthService);
   const router = inject(Router);
  
  const requiredRole = route.data['role'];
  if(auth.IsloggedIn(requiredRole))
  {
      return true;
  }
  else{
    router.navigate(['restricted']);
    return false;
  }
};

