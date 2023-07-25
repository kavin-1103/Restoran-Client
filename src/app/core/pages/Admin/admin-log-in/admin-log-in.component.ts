import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'app/core/services/AuthService/auth.service';


@Component({
  selector: 'admin-login',
  templateUrl: './admin-log-in.component.html',
  styleUrls: ['./admin-log-in.component.scss'],
  providers:[MessageService ]
})
export class AdminLogInComponent implements OnInit{

  showPopUp: boolean= true;
  logInForm !: FormGroup;
  
  email !: string;
  constructor(private authService : AuthenticationService,
              private formBuilder : FormBuilder,
              private router: Router,
              private messageService: MessageService
              ) {
                
  }
  ngOnInit(): void {
    
    this.logInForm = this.formBuilder.group({
      email: [null, Validators.required],
       password: [null, Validators.required]
     });
    
  }

  
  ngAfterViewInit() {
    //this.adminLogin();
  }

success : boolean = false;

adminLogin() {

 

  this.authService.login(this.logInForm).subscribe({
    next : (response: any) => {
      
      setTimeout(() => {
        this.router.navigateByUrl('/dashboard');
      }, 1000); 
    },
    error :(error: any) => {
      
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      }
    });
}


@Output() emailVerified: EventEmitter<string> = new EventEmitter<string>();
forgotPassword()
{
  this.email = this.logInForm.get('email')?.value;


  this.authService.emailExist(this.email).subscribe({
    next :(response: any) => {
      if (response.success) {
        this.emailVerified.emit(this.email);
        this.router.navigate(['/admin-reset-password']);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.message
        });
      }
    },
    error :(error:any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error.message,
      });
    }});
}

}