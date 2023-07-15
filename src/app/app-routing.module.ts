import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { TableReservationComponent } from './table-reservation/table-reservation.component';

import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { AdminLogInComponent } from './admin-log-in/admin-log-in.component';

import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { authguardGuard } from './Services/AuthGuard/shared/authguard.guard';
import { AdminRestrictedComponent } from './admin-restricted/admin-restricted.component';
import { FullComponent } from './layouts/full/full.component';
import { AdminFunctionModule } from './admin-functions/admin-functions.module';
import { AdminDashboardComponent } from './dashboard copy/dashboard.component';
import { ComponentsRoutes } from './admin-functions/admin-functions.routing';
import { FoodItemComponent } from './admin-functions/food-item/food-item.component';
import { DiningTableComponent } from './admin-functions/dining-table/dining-table.component';
import { OrderDetailComponent } from './admin-functions/order-detail/order-detail.component';
import { ReviewComponent } from './admin-functions/review/review.component';



export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  // { 
  //   path : 'dashboard',
  //    component: DashboardComponent,
  //    canActivate :[authguardGuard],
  //    data : { role: 'Admin' },
  //    children: [
  //     // {path : 'admin-reset-password', component: AdminResetPasswordComponent,canActivate :[authguardGuard], data : { role: 'Admin' }, },
  //     // { path: 'order-details', component: OrderDetailsComponent },
  //     // { path: 'reviews', component: ReviewsComponent },
  //   ]
  // },
  {path : '',
  component:FullComponent,
  // canActivate :[authguardGuard],
  // data : { role: 'Admin' },
  children : [
     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
    path: 'dashboard', 
     children : [
      { path: '', component: AdminDashboardComponent }, // Dashboard home page
      { path: 'food-item', component: FoodItemComponent }, // Food Item component
      {path : 'dining-table',component: DiningTableComponent},
      {path : 'order-detail',component:OrderDetailComponent},
      {path: 'review', component:ReviewComponent}

    ]
  },
     
    // {
    //   path:'dashboard',
    //   loadChildren : ()=>
    //   import ('./dashboard copy/dashboard.module').then((m)=>m.DashboardModule)
    // },
    // {
    //   path:'admin-functions',
    //   loadChildren : ()=>
    //   import ('./admin-functions/admin-functions.module').then((m)=>m.AdminFunctionModule)
    // },
    
  ],
},
  {path : 'admin-reset-password', component: AdminResetPasswordComponent,canActivate :[authguardGuard], data : { role: 'Admin' }, },
  { 
    path: 'reserve_table',
     component: TableReservationComponent,
    
    },

  { path : 'login', component: UserLogInComponent},
  { path : 'admin-login',  component : AdminLogInComponent},
  {path : 'admin-dashboard', component: AdminDashboardComponent },
 
  {path : 'restricted', component : AdminRestrictedComponent},
  ...ComponentsRoutes,
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
