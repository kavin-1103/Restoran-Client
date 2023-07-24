import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { authguardGuard } from 'app/core/guards/authguard.guard';
import { CustomerVerifyEmailComponent } from './customer-verify-email/customer-verify-email.component';
import { CustomerResetPasswordComponent } from './customer-reset-password/customer-reset-password.component';
import { HomeModule } from './home/home.module';
import { ProfileComponent } from './profile/profile.component';



//Routes for Customer

const customerRoutes: Routes = [
      { path: 'home', component: HomeComponent },
      { path: 'verify-email', component: CustomerVerifyEmailComponent },
      {path : 'reset-password', component: CustomerResetPasswordComponent},
      { path: 'cart', component: CartComponent,canActivate: [authguardGuard] , data:{role:'Customer'} },
      { path: 'menu-item', component: MenuItemComponent ,canActivate: [authguardGuard], data:{role:'Customer'}},
      {path : 'reserve-dining', component:  ReservationComponent, canActivate: [authguardGuard], data:{role:'Customer'}},
      {path : 'my-profile', component: ProfileComponent,  canActivate:[authguardGuard], data:{role:'Customer'}}
  ];

  
  @NgModule({
    imports: [
        RouterModule.forChild(customerRoutes),
      
    ],
    exports: [
        RouterModule,
        HomeModule,
        FormsModule,
        ReactiveFormsModule
    ]
  })


  export class CustomerRoutingModule { }
  