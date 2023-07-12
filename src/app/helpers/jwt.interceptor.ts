import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) { 
    let token = localStorage.getItem('user');
    console.log(token);
    if (token) {
        token = token.replace(/\\/g, '')
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    console.log('header added');
    console.log(request);
    return next.handle(request);
  }
}
