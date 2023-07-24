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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';

interface TableData {
  tableId: number;
  tableNumber: number;
  capacity: number;
}

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  maxReservationDate!: string;

  showAvailableTables: boolean = false;
  availableTables: TableData[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService , 
    private router : Router ,
  ) {
    this.reservationForm = this.formBuilder.group({
      reservationDate: ['', [Validators.required]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      numberOfGuests: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);
    this.maxReservationDate = maxDate.toISOString().split('T')[0];
  }

  submitReservation() {
    if (this.reservationForm.valid) {
      const reservationData = {
        tableId: 0, // Table ID will be set when the user selects a table
        reservationDate: this.getReservationDateISOString(),
        startTime: this.getTimeInISOStringFormat(
          this.reservationForm.get('startTime')?.value
        ),
        endTime: this.getTimeInISOStringFormat(
          this.reservationForm.get('endTime')?.value
        ),
        numberOfGuests: this.reservationForm.get('numberOfGuests')?.value,
      };

      console.log(reservationData);
      this.http
        .post<any>('https://localhost:7135/api/customer/Reservations/Tables', reservationData)
        .subscribe(
          (response) => {
            // Handle the response from the backend if needed
            console.log('Response from the backend:', response);
            if (response?.data && Array.isArray(response.data)) {
              // The response contains the available table data
              this.availableTables = response.data;
              this.showAvailableTables = true; // Show the available tables section
            } else {
              console.error('Invalid response data:', response);
            }
          },
          (error) => {
            // Handle errors if the request fails
            console.error('Error sending data to the backend:', error);
            this.availableTables = []; // Clear availableTables on error
            this.showAvailableTables = false;
          }
        );
    }
  }

  private getReservationDateISOString(): string {
    const reservationDate = this.reservationForm.get('reservationDate')?.value;
    // Check if the reservationDate is a valid date (not null, empty, or invalid format)
    if (reservationDate) {
      const date = new Date(reservationDate);
      if (!isNaN(date.getTime())) {
        // The date is valid, so convert it to ISO string
        return date.toISOString();
      }
    }
    // Return an empty string if the reservationDate is not valid
    return '';
  }

  private getTimeInISOStringFormat(timeString: string): string {
    const selectedDate = this.reservationForm.get('reservationDate')?.value;
    const dateTimeString = `${selectedDate}T${timeString}`;
    const time = new Date(dateTimeString);
    return time.toISOString();
  }

  updateEndTime() {
    const startTime = this.reservationForm.value.startTime;
    if (startTime) {
      // Convert the selected start time to a Date object
      const startDate = new Date(`2000-01-01T${startTime}`);

      // Calculate the end time options based on the selected start time
      const endTimeOptions = [];
      let nextTime = new Date(startDate);
      while (nextTime.getHours() < 16) {
        nextTime.setMinutes(nextTime.getMinutes() + 30);
        if (nextTime.getHours() === 16) break; // Limit end time to 4:00 PM
        endTimeOptions.push(nextTime.toTimeString().slice(0, 5));
      }

      // Update the end time options in the form control
      this.reservationForm.get('endTime')?.setValue(endTimeOptions[0]);
    }
  }

  confirmReservation(tableId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed with the reservation?',
      accept: () => {
        // Proceed with the reservation creation after the user confirms
        const reservationData = {
          tableId: tableId, // Set the selected table ID for the reservation
          reservationDate: this.getReservationDateISOString(),
          startTime: this.getTimeInISOStringFormat(
            this.reservationForm.get('startTime')?.value
          ),
          endTime: this.getTimeInISOStringFormat(
            this.reservationForm.get('endTime')?.value
          ),
          numberOfGuests: this.reservationForm.get('numberOfGuests')?.value,
        };

        console.log(reservationData);
        this.http
          .post<any>(
            'https://localhost:7135/api/customer/Reservations/ReserveTable',
            reservationData
          )
          .subscribe(
            (response) => {
              // Handle the response from the backend if needed
              console.log('Response from the backend:', response);
              // Show a success message or perform other actions as required.
              this.messageService.add({
                severity: 'success',
                summary: 'Reservation Successful',
                detail: 'Your reservation has been confirmed.',
              });
              this.router.navigate(['/order'], { queryParams: { table_id: tableId } });
              this.showAvailableTables = false; // Hide the available tables section after the reservation is confirmed.
            },
            (error) => {
              // Handle errors if the request fails
              console.error('Error sending data to the backend:', error);
              // Show an error message if required.
              this.messageService.add({
                severity: 'error',
                summary: 'Reservation Failed',
                detail: 'An error occurred while making the reservation.',
              });
              this.showAvailableTables = false; // Hide the available tables section on error.
            }
          );
      },
    });
  }
}

