import { Component , Input} from '@angular/core';
import { FormGroup ,FormControl, FormBuilder,Validators} from '@angular/forms';
import { AuthenticationService } from 'app/core/services/AuthService/auth.service';

@Component({
  selector: 'app-admin-reset-password',
  templateUrl: './admin-reset-password.component.html',
  styleUrls: ['./admin-reset-password.component.scss']
})
export class AdminResetPasswordComponent {
  @Input() email!: string;
  
  showOtpInput: boolean = false;
  isButtonDisabled: boolean = true;
  showTimer: boolean = false;
  remainingTime: number = 60;

  constructor(private formBuilder: FormBuilder, private authService : AuthenticationService) {}

  ngOnInit() {
    
  }
 
  confirmOTP()
  {

  }

  startTimer() {
    this.showTimer = true;
    const interval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        clearInterval(interval);
        this.isButtonDisabled = true;
        this.showTimer = false;
      }
    }, 1000);
  }

  generateOtp() {
   
    
    this.showOtpInput = true;
    this.isButtonDisabled = false;
    
  
      // Calls the AuthService to send OTP to email
      this.authService.sendOtpToEmail(this.email)
        .subscribe(
          (response : any) => {
            console.log(response);
            console.log('OTP sent to email');
          },
          (error : any) => {
            // Handle error
            console.error('Error sending OTP:', error);
            this.isButtonDisabled = false; // Enable the button again
          }
        );
    this.startTimer();


  }
}
