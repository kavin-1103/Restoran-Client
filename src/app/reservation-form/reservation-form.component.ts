// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-reservation-form',
//   templateUrl: './reservation-form.component.html',
//   styleUrls: ['./reservation-form.component.scss']
// })
// export class ReservationFormComponent implements OnInit {

//   reservationForm! : FormGroup;
//   showAvailableTables: boolean = false;

//   constructor(private fb: FormBuilder) { }

//   ngOnInit() {
//     this.reservationForm = this.fb.group({
//       date: ['', Validators.required],
//       startTime: ['', Validators.required],
//       endTime: ['', Validators.required],
//       numberOfGuests: ['', [Validators.required, Validators.min(1)]]
//     });
//   }

//   onSubmit() {
//     if (this.reservationForm.valid) {
//       // Handle form submission
//       this.showAvailableTables = true;
//       console.log(this.reservationForm.value);
//     } else {
//       // Form is invalid, display error messages or take appropriate action
//     }
//   }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})

export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  startTimeOptions: string[] = [];
  endTimeOptions: string[] = [];
  showAvailableTables : boolean = false;

  minDate!: string;
  maxDate!: string;

  startTimeSelected : boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.reservationForm = this.formBuilder.group({
      date: ''
    });

    const today = new Date();
    const next20Days = new Date();
    next20Days.setDate(today.getDate() + 20);

    this.minDate = this.formatDate(today);
    this.maxDate = this.formatDate(next20Days);
  }

  ngOnInit() {
    this.reservationForm = this.formBuilder.group({
      date: '',
      numberOfGuests: '',
      startTime: '',
      endTime: ''
    });

    this.generateStartTimeOptions();
  }

  generateStartTimeOptions() {
    const startTime = new Date();
    startTime.setHours(9, 0, 0); // Set initial start time to 9:00 AM

    const endTime = new Date();
    endTime.setHours(20, 30, 0); // Set end time to 8:30 PM

    const interval = 30; // Interval of 30 minutes

    while (startTime <= endTime) {
      const timeString = this.formatTime(startTime);
      this.startTimeOptions.push(timeString);

      startTime.setMinutes(startTime.getMinutes() + interval);
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  endTime() {
    const selectedStartTime = this.reservationForm.value.startTime;
    console.log(selectedStartTime);
    // Calculate end time options based on selected start time
    if (!selectedStartTime) {
      this.startTimeSelected = false;
    } else {
      this.startTimeSelected = true;
      // Calculate end time options based on selected start time
      this.generateEndTimeOptions(selectedStartTime);
    }
    
  }

  generateEndTimeOptions(selectedStartTime: string) {
    const startTimeParts = selectedStartTime.split(':');
    console.log(startTimeParts);
    const hours = parseInt(startTimeParts[0], 10);
    const minutes = parseInt(startTimeParts[1], 10);
    const startDateTime = new Date();
    startDateTime.setHours(hours, minutes, 0);

    console.log(startDateTime);
  
    const endDateTime30 = new Date(startDateTime.getTime() + 30 * 60000); // Add 30 minutes
    const endDateTime60 = new Date(startDateTime.getTime() + 60 * 60000); // Add 60 minutes
  
    // console.log(endDateTime30);
    // console.log(endDateTime60);
    // this.endTimeOptions = [
    //   this.formatTime(endDateTime30),
    //   this.formatTime(endDateTime60)
    // ];
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

      const endTime30 = endDateTime30.toLocaleTimeString([], options);
      const endTime60 = endDateTime60.toLocaleTimeString([], options);

      this.endTimeOptions = [endTime30, endTime60];
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



  onSubmit()
  {
    this.showAvailableTables = true;
    console.log("Shown available tables");

  }
}


