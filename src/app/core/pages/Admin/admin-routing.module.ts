import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLogInComponent } from './admin-log-in/admin-log-in.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { FullComponent } from './full/full.component';


import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { FoodItemComponent } from './dashboard/food-item/food-item.component';
import { DiningTableComponent } from './dashboard/dining-table/dining-table.component';
import { OrderDetailComponent } from './dashboard/order-detail/order-detail.component';
import { ReviewComponent } from './dashboard/review/review.component';
import { authguardGuard } from 'app/core/guards/authguard.guard';


export const adminRoutes: Routes = [
    {
        path : 'admin-login',
        component : AdminLogInComponent,
    },

    {
      path: 'dashboard',
      data: { 
        title: "Dashboard",
        role: 'Admin'
      },
      canActivate: [authguardGuard],
      component : FullComponent,
      children : [
        { path: '', component: AdminDashboardComponent }, 
        { path: 'food-item', component: FoodItemComponent }, 
        {path : 'dining-table',component: DiningTableComponent},
        {path : 'order-detail',component:OrderDetailComponent},
        {path: 'review',component:ReviewComponent}
  
      ]
       
    }
  ]


  
  

