import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'app/shared/customer-shared/customer-shared.module';
import { AdminLogInComponent } from './admin-log-in/admin-log-in.component';
import { ButtonModule } from 'primeng/button';
import { AppModule } from 'app/app.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { FullComponent } from './full/full.component';
import { Router, RouterModule } from "@angular/router";

import { NgOtpInputModule } from  'ng-otp-input';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from 'app/shared/admin-shared/sidebar/sidebar.component';
import { EditService } from './dashboard/food-item/edit.service';
import { adminRoutes } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminLogInComponent,
   
    // AdminResetPasswordComponent,
    AdminResetPasswordComponent,

    

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
