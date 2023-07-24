
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/core/services/AuthService/auth.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators ,ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import {  Router } from '@angular/router';


const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
};


@Component({
  selector: 'app-customer-reset-password',
  templateUrl: './customer-verify-email.component.html',
  styleUrls: ['./customer-verify-email.component.scss'],
  providers:[MessageService]
})
export class CustomerVerifyEmailComponent implements OnInit {

 
 
  verified: boolean = false;
  resetPasswordForm !: FormGroup;
  emailVerified: boolean = false;
  passwordForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      otp: [null, [Validators.required]]
    });
  }

  onOtpChange(event: string) {
    this.resetPasswordForm.get('otp')?.setValue(event);
  }

  sendOTP() {
    const email = this.resetPasswordForm.get('email')?.value;
    if (!email) {
      
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Email cannot be Empty !!',
      });
      return;
    }

    this.authService.emailExist(email).subscribe((response: any) => {
      if (response.success) {
        this.verified = true;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.message,
        });
      }
    });
  }

  verifyOTP() {
 
    this.authService.registerUser(this.resetPasswordForm).subscribe(
      (response: any) => {
        if (response.success) {
          
          this.messageService.add({ severity: 'success', summary: 'OTP Verification', detail: 'OTP verification successful!' });
         // this.router.navigate(['/reset-password']);
         const email : string = this.resetPasswordForm.get('email')?.value;
         this.router.navigate(['/reset-password'], 
         { queryParams: { email_id : email }, 
         replaceUrl:true
        }
         )

          this.emailVerified = true;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Invalid OTP', detail: 'Invalid OTP, please try again.' });
        }
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while verifying OTP.' });
      }
    );
}

onSubmit() {
    if (this.passwordForm.valid) {
      // Handle form submission here
      console.log(this.passwordForm.value);
    }
  }
}

interface OtpData {
  email: string;
  otp: string;
}
