import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminLogInComponent } from './admin-log-in/admin-log-in.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from "@angular/router";

import { NgOtpInputModule } from  'ng-otp-input';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { EditService } from './dashboard/food-item/edit.service';
import { adminRoutes } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminLogInComponent,
  ],  

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    PasswordModule,
    NgOtpInputModule,
    RouterModule.forChild(adminRoutes),
    NgbCollapseModule,
    
    
  ],
  exports:[RouterModule],

  providers:[EditService]
})
export class AdminModule { }
