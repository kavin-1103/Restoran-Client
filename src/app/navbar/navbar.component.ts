import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup} from '@angular/forms';


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
  styleUrls: ['./navbar.component.scss']
})



export class NavbarComponent {
  register: Register = {
    username: '',
    mailId: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  };

  logInVisible: boolean = false;
  signUpVisible: boolean = false;
  username: string = '';
  password: string = '';

  passwordsMismatch: boolean = false;

  value!: string;


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

  constructor(private dialogService: DialogService,private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      mailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  showLogInDialog() {
    
    this.logInVisible = true;
  }
  showSignUpDialog()
  {
    this.signUpVisible = true;
  }
  login() {
    // Perform login logic here
    // Access the username and password using this.username and this.password
    // You can send an API request or perform any authentication mechanism
    // Close the dialog when the login is successful
    // this.visible = false;
  }
  onRegisterSubmit()
  {
    
  }
  
  checkPasswordMatch() {
    this.passwordsMismatch = this.register.password !== this.register.confirmPassword;
  }


}
