import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot,UrlTree } from '@angular/router';

import { Router } from '@angular/router';
import { inject} from '@angular/core';

import { AuthService } from './auth.service';

// class AdminGuard
// {
//   canActivate(

//     route: ActivatedRouteSnapshot, 
//     state: RouterStateSnapshot): boolean  | UrlTree { 
//       return true;
//     }
  
// }


export const authguardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | UrlTree => {
    //const auth = new AuthService();
  //  const router = new Router();
  const auth = inject(AuthService);
   const router = inject(Router);
  //  if(auth.IsloggedIn())
  //  {
  //   return true;
  //  }
  //  console.log("not authorized");
  //  router.navigate(['restricted']);
  //  return false;

  //return inject(AdminGuard).canActivate(route,state);

  //const token =localStorage.getItem('user');
  const requiredRole = route.data['role'];
  if(auth.IsloggedIn(requiredRole))
  {
      return true;
  }
  else{
    router.navigate(['restricted']);
   // router.createUrlTree(['restricted']);
    return false;
  }
};

