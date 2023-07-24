
// import { Component } from '@angular/core';
// import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

        
// @Component({
//     selector: 'app-confirm-dialog',
//     templateUrl: './confirm-dialog.component.html',
//     providers: [ConfirmationService, MessageService]
// })
// export class ConfirmDialogComponent {
//     constructor() {}
// }

//     confirm1() {
//         this.confirmationService.confirm({
//             message: 'Are you sure that you want to proceed?',
//             header: 'Confirmation',
//             icon: 'pi pi-exclamation-triangle',
//             accept: () => {
//                 this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
//             },
//             reject: (type : ConfirmEventType) => {
//                 switch (type) {
//                     case ConfirmEventType.REJECT:
//                         this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
//                         break;
//                     case ConfirmEventType.CANCEL:
//                         this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
//                         break;
//                 }
//             }
//         });
//     }

    
// }


import { Component } from '@angular/core';

        
@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    providers: []
})
export class ConfirmDialogComponent {
    constructor() {}

   
}