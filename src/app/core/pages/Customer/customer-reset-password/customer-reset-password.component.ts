import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/core/services/AuthService/auth.service';
import { MessageService } from 'primeng/api';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
};

@Component({
  selector: 'app-customer-reset-password',
  templateUrl: './customer-reset-password.component.html',
  styleUrls: ['./customer-reset-password.component.scss']
})
export class CustomerResetPasswordComponent implements OnInit{

  passwordForm!: FormGroup;
  value!: string;
  email !: string ;

  passwordChange !: ResetPassword;


  ngOnInit(): void {

    this.route.queryParams.subscribe((params)=>{
      this.email = params['email_id'];
     
    })
    this.passwordForm = this.formBuilder.group(
      {
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]]
      },
      { validators: passwordMatchValidator }
    );
  }
  constructor(private formBuilder: FormBuilder,  private route : ActivatedRoute,
    private router : Router,
    private authService : AuthenticationService,
    private messageService : MessageService) {
   
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      // Handle form submission here
      const password: string = this.passwordForm.get('confirmPassword')?.value;
      
      const requestBody= { email: this.email, password: password };
        this.authService.changePassword(requestBody).subscribe({
          next:(response) => {
            // Handle success response here
            if(response.success)
            {
            
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed Successfully' });
              setTimeout(() => { 
                this.router.navigate(['home']);}, 2000);
              
            }
            else
            {
              this.messageService.add({ severity: 'warn', summary: response.error, detail: response.error });
            }
          },
          error:(error) => {
            // Handle error response here
            console.error('Password reset failed.', error);
          }
    });
      }
  }
}


interface ResetPassword {
  email: string;
  password: string;
}
