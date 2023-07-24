import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';




export interface logInResponse
{
    id: number,
    token : string;
}

export interface registerForm
{
    email : string;
    otp:string;
}



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<null>;
    public user: Observable<null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(loginForm : FormGroup) {
        return this.http.post<any>(`${environment.baseUrl}/Auth/login`, loginForm.value)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token',user.data.token);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.userSubject.next(null);
        this.router.navigate(['/admin-login']);
    }

    customerLogout()
    {
        localStorage.removeItem('token');
        this.userSubject.next(null);
    }

    
    emailExist( email : string): Observable<any>
    {   
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'text/plain'
            }),
          };
        return this.http.post<any>(`${environment.baseUrl}/Auth/ForgotPassword?email=${encodeURIComponent(email)}`,options);
    }

    isAuthenticated()
    {
        if(localStorage.getItem('token'))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    

    //Calls Api to register customer details and send OTP to his mail

    verifyUser(registerForm : FormGroup) 
    {
        
        return this.http.post<any>(`${environment.baseUrl}/Auth/register`, registerForm.value)
    }

    //Verify for Valid OTP
    registerUser(dto: any)
    {
        
        return this.http.post<any>(`${environment.baseUrl}/Auth/Verify`,dto.value);
    }
    

    registerCustomer(dto: any)
    {
        return this.http.post<any>(`${environment.baseUrl}/Auth/Verify`,dto);
    }

    

    sendOtpToEmail(email:string)
    {
        return this.http.post<any>(`${environment.baseUrl}/Auth/ForgotPassword`,  email );
    }


    changePassword( dto : any)
    {
       
        //const requestBody: ResetPassword = { email: email, password: password };
        return this.http.post<any>(`${environment.baseUrl}/Auth/ResetPassword`, dto)
    }
}