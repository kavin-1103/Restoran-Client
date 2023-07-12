import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';



@Component({
  selector: 'app-available-tables',
  templateUrl: './available-tables.component.html',
  styleUrls: ['./available-tables.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AvailableTablesComponent  {

  availableTables: any[] = [];

  constructor(private http: HttpClient,private confirmationService: ConfirmationService, private messageService: MessageService) 
  {
    this.http.get<any>('https://localhost:7014/api/OrderTable/GetAll/').subscribe(
        response => {
          // Assign the fetched data to availableTables property
          console.log(response);
          this.availableTables = response;
        },
        error => {
          console.log('Error fetching available tables:', error);
        }
      );
  }


  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: (type: ConfirmEventType) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}
   

  
    
}



