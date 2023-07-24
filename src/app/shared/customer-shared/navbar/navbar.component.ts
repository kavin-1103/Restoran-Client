import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AuthenticationService } from 'app/core/services/AuthService/auth.service';
import { MessageService } from 'primeng/api';




export interface Register
{
  username : string;
  mailId : string;
  phoneNumber : string;
  password : string;
  confirmPassword : string;
}



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[MessageService ]
})



export class NavbarComponent implements OnInit {
  register: Register = {
    username: '',
    mailId: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  };


  tokenExists : boolean = false;
  logInVisible: boolean = false;
  signUpVisible: boolean = false;
  isEmailVerified: boolean = false;
  username: string = '';
  password: string = '';

  passwordsMismatch: boolean = false;

  value!: string;

  showOtpInput = false;
  otp = '';
  confirmPasswordValue: string = ''; 


//  validators
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
  ]);

  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{10}$')
  ]);
  loginForm: FormGroup;
  registerForm: FormGroup;

  // private dialogService: DialogService,
  constructor(private fb: FormBuilder, private router: Router , private authService : AuthenticationService, private messageService: MessageService ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
     if(this.authService.isAuthenticated())
     {
        this.tokenExists = true;
     }
     else{
      this.tokenExists = false;
     }
  }

  showLogInDialog() {
    
    this.logInVisible = true;
  }
  showSignUpDialog()
  {
    this.signUpVisible = true;
  }

  customerLogin() {
    this.authService.login(this.loginForm).subscribe(
      (response: any) => {
        
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "Logged In Successfully" ,
        });
        this.tokenExists= true;
        console.log("Logged In successfully");
        setTimeout(() => {
          this.logInVisible= false;
          this.registerForm.reset();
        }, 1000);
        
      },
      (error: any) => {
        // Handle error response
        console.error(error);
        console.log('Status:', error.status);
        console.log('Message:', error.message);
        console.log('Errors:', error.error.errors);
  
        
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
    );
    
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  verifyEmail()
  {
    
    
    
      // Call your service to send OTP here and pass the email as a parameter
      this.authService.verifyUser(this.registerForm).subscribe(
        (response) => {
          // Handle the service response, maybe show OTP input if success
          if (response.success) {
          this.messageService.add({
            severity: 'info',
            summary: 'Verification',
            detail: "OTP sent Successfully" ,
          });
          this.showOtpInput=true;
          this.isEmailVerified=true
        }
        else
        {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message,
          });
        }
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: error,
            detail: error.message ,
          });
        }
      );
    }


    
  onRegisterSubmit()
  {
    const email = this.registerForm.get('email')?.value;
    console.log(email);
    console.log(this.otp);
    const otp = this.otp
    const dto: VerifyOtpDto = { email, otp };
    this.authService.registerCustomer(dto).subscribe(
      (response: any) => {
        console.log(response);
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: "Registered Successfully",
          });
  
          console.log("Registered Successfully!!");
          setTimeout(() => {
            this.signUpVisible = false;
            this.registerForm.reset();
          }, 1000);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message,
          });
        }
        
      },
      (error: any) => {  }
    );
  }
  
  checkPasswordMatch() {
    this.passwordsMismatch = this.register.password !== this.confirmPasswordValue;
  }
  onConfirmPasswordChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.confirmPasswordValue = target.value;
    this.checkPasswordMatch(); // Call the function to check password match
  }


  adminlogin()
  {
    this.router.navigate(["admin-login"]);
  }

  logOut()
  {
    
    this.authService.customerLogout();
    this.tokenExists= false;
    this.router.navigate(['home']);

  }
  
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}
