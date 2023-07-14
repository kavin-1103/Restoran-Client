import { Component , Input} from '@angular/core';
import { FormGroup ,FormControl, FormBuilder,Validators} from '@angular/forms';

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
  
  // OtpForm!: FormGroup;

  // otpFormControl!: FormControl;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    //this.otpFormControl = new FormControl('', Validators.required);
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
    // Perform OTP generation logic
    // Set isButtonDisabled to true to disable the button
    // Start the timer
    this.showOtpInput = true;
    this.isButtonDisabled = false;
    this.startTimer();
  }
}
