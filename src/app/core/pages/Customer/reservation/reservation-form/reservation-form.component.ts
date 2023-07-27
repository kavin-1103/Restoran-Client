

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { environment } from 'environments/environment';


interface TableData {
  tableId: number;
  tableNumber: number;
  capacity: number;
}

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]

})


export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  maxReservationDate!: string;
  minReservationDate!: string;

  showAvailableTables: boolean = false;
  availableTables: TableData[] = [];

  startTimeOptions: string[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.reservationForm = this.formBuilder.group({
      reservationDate: ['', [Validators.required]],
      startTime: ['', Validators.required],
      endTime: [{ value: '', disabled: true }, Validators.required],
      numberOfGuests: ['', Validators.required],
    });
  }



  ngOnInit(): void {
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);
    this.minReservationDate = currentDate.toISOString().split('T')[0];
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
      

       
      this.http
        .post<any>(`${environment.baseUrl}/customer/Reservation/Tables`, reservationData)
        .subscribe({
          next:(response) => {

            console.log('Response from the backend:', response);
            if (response?.data && Array.isArray(response.data)) {

              this.availableTables = response.data;
              this.showAvailableTables = true;
            } else {
             
            }
          },
          error:(error) => {

            console.error('Error sending data to the backend:', error);
            this.availableTables = [];
            this.showAvailableTables = false;
          }
    });
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
    time.setHours(time.getHours() + 5);
    time.setMinutes(time.getMinutes() + 30);
    return time.toISOString();
  }



  // Updates End Time When Start Time is Selected by User

  updateEndTime() {
    const startTime = this.reservationForm.value.startTime;
    if (startTime) {
      const startDate = new Date(`2000-01-01T${startTime}`);


      const endTimeOptions = [];
      let nextTime = new Date(startDate);
      while (nextTime.getHours() < 16) {
        nextTime.setMinutes(nextTime.getMinutes() + 30);
        if (nextTime.getHours() === 16) break;
        endTimeOptions.push(nextTime.toTimeString().slice(0, 5));
      }


      this.reservationForm.get('endTime')?.setValue(endTimeOptions[0]);
    }
  }



  //Confirm Booking
  confirmReservation(tableId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed with the reservation?',
      accept: () => {

        const reservationData = {
          tableId: tableId,
          reservationDate: this.getReservationDateISOString(),
          startTime: this.getTimeInISOStringFormat(
            this.reservationForm.get('startTime')?.value
          ),
          endTime: this.getTimeInISOStringFormat(
            this.reservationForm.get('endTime')?.value
          ),
          numberOfGuests: this.reservationForm.get('numberOfGuests')?.value,
        };


        this.http
          .post<any>(
            `${environment.baseUrl}/customer/Reservation/ReserveTable`,
            reservationData
          )
          .subscribe({
            next:(response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Reservation Successful',
                detail: 'Your reservation has been confirmed.',
              });

              const reservationId = response.data.reservationId;

              setTimeout(() => {
                this.router.navigate(['/menu-item'],
                  {
                    queryParams: { table_id: tableId, reservation_id: reservationId },
                    replaceUrl: true
                  });
              }, 2000);

              this.showAvailableTables = false;
            },
            error:(error) => {
              console.error('Error sending data to the backend:', error);

              this.messageService.add({
                severity: 'error',
                summary: 'Reservation Failed',
                detail: 'An error occurred while making the reservation.',
              });

              this.showAvailableTables = false;
            }
      });
      }
    });
  }

  isShowAvailableTablesEnabled(): boolean {
    const startTime = this.reservationForm.get('startTime')?.value;

    if (startTime) {
      const startHour = parseInt(startTime.split(':')[0], 10);
      const startMinute = parseInt(startTime.split(':')[1], 10);

      // Check if startTime is between 10:00 am (10:00) and 3:30 pm (15:30)
      return (
        (startHour === 10 && startMinute >= 0) ||
        (startHour > 10 && startHour < 15) ||
        (startHour === 15 && startMinute <= 30)
      );
    }

    // If startTime is not selected, disable the button
    return false;
  }

}