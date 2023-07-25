import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CartComponent } from './cart/cart.component';
import { SharedModule } from 'app/shared/customer-shared/customer-shared.module';
import { ReservationComponent } from './reservation/reservation.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ReservationFormComponent } from './reservation/reservation-form/reservation-form.component';
import { AvailableDiningsComponent } from './reservation/available-dinings/available-dinings.component';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from './customer-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import {  ToastModule } from 'primeng/toast';
import { CustomerVerifyEmailComponent } from './customer-verify-email/customer-verify-email.component';
import { CardModule } from 'primeng/card';
import { NgOtpInputModule } from  'ng-otp-input';
import { CustomerResetPasswordComponent } from './customer-reset-password/customer-reset-password.component';
import { PasswordModule } from 'primeng/password';
import { ProfileComponent } from './profile/profile.component';
import { MyOrdersComponent } from './profile/my-orders/my-orders.component';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    CartComponent,
    ReservationComponent,
    MenuItemComponent,
    ReservationFormComponent,
    AvailableDiningsComponent,
    CustomerVerifyEmailComponent,
    CustomerResetPasswordComponent,
    ProfileComponent,
    MyOrdersComponent,
],
  imports: [
    CommonModule,
    SharedModule,
    PasswordModule,
    CustomerRoutingModule,
    RouterModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    NgOtpInputModule,
    PaginatorModule,
    CardModule,
    SidebarModule
],

providers:[MessageService,ConfirmationService,DialogService,DatePipe]
})
export class CustomerModule { }
