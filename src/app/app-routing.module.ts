import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { TableReservationComponent } from './table-reservation/table-reservation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { AdminLogInComponent } from './admin-log-in/admin-log-in.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { authguardGuard } from './shared/authguard.guard';
import { AdminRestrictedComponent } from './admin-restricted/admin-restricted.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { 
    path : 'dashboard',
     component: DashboardComponent, 
     canActivate :[authguardGuard],
     data : { role: 'Admin' },
     children: [
      // {path : 'admin-reset-password', component: AdminResetPasswordComponent,canActivate :[authguardGuard], data : { role: 'Admin' }, },
      // { path: 'order-details', component: OrderDetailsComponent },
      // { path: 'reviews', component: ReviewsComponent },
    ]
  },
  {path : 'admin-reset-password', component: AdminResetPasswordComponent,canActivate :[authguardGuard], data : { role: 'Admin' }, },
  { 
    path: 'reserve_table',
     component: TableReservationComponent,
     canActivate :[authguardGuard],
     data : { role: 'Customer' },
    },
    
  { path : 'login', component: UserLogInComponent},
  { path : 'admin-login',  component : AdminLogInComponent},
  {path : 'admin-dashboard', component: AdminDashboardComponent },
 
  {path : 'restricted', component : AdminRestrictedComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
