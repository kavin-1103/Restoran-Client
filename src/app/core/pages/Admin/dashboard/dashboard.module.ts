import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { AdminDashboardComponent } from "./dashboard.component";
import { SalesRatioComponent } from "./dashboard-components/sales-ratio/sales-ratio.component";
import { FeedsComponent } from "./dashboard-components/feeds/feeds.component";
import { CustomerDetailsComponent } from "./dashboard-components/customer-details/customer-details.component";
import { TopCardsComponent } from "./dashboard-components/top-cards/top-cards.component";
import { BlogCardsComponent } from "./dashboard-components/blog-cards/blog-cards.component";


import {  GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { FoodItemComponent } from "./food-item/food-item.component";
import { DiningTableComponent } from "./dining-table/dining-table.component";

import { ReviewComponent } from "./review/review.component";
import { CarouselModule } from 'primeng/carousel';

import { CardModule } from "primeng/card";
import { FoodCategoryComponent } from "./food-category/food-category.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

import { ChartModule } from 'primeng/chart';

import { SidebarComponent } from "app/shared/admin-shared/sidebar/sidebar.component";
import { NavigationComponent } from "app/shared/admin-shared/header/navigation.component";
import { FullComponent } from "../full/full.component";
import { ToastModule } from "primeng/toast";



// const routes: Routes = [
//   {
//     path: 'dashboard',
//     data: {
//       title: "Dashboard",
//     },
//     component : FullComponent,
//     children : [
//       { path: '', component: AdminDashboardComponent }, // Dashboard home page
//       { path: 'food-item', component: FoodItemComponent }, // Food Item component
//       {path : 'dining-table',component: DiningTableComponent},
//       {path : 'order-detail',component:OrderDetailComponent},
//       {path: 'review', component:ReviewComponent}

//     ]
     
//   }
// ]

//   // children : [

//   //   {path : 'food-item' , component: FoodItemComponent}
//   //   // loadChildren : ()=>
//   //   //   import ('../admin-functions/admin-functions.module').then((m)=>m.AdminFunctionModule)

//   // ]
    
    
//   },
  // {
  //   path: "dining-table",
 
  //   component: DiningTableComponent,
  
  //   // children : [
  //   //   {
  //   //     path: "dining-table",
  //   //     component : DiningTableComponent,
  //   //   },

  //   // ]
    
    
  // },


//   {path : '',
//   component:FullComponent,
//   canActivate :[authguardGuard],
//   data : { role: 'Admin' },
//   children : [
//     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//     {
//       path:'dashboard',
//       loadChildren : ()=>
//       import ('./dashboard copy/dashboard.module').then((m)=>m.DashboardModule)
//     },
//     {
//       path:'admin-functions',
//       loadChildren : ()=>
//       import ('./admin-functions/admin-functions.module').then((m)=>m.AdminFunctionModule)
//     },
    
//   ],
// },
  
  // {
  //   path: "dining-table",
  //   component : FoodItemComponent,
  // },
  // {
  //   path: "order-details",
  //   component : BlogCardsComponent,
  // },
  // {
  //   path: "reviews",
  //   component : BlogCardsComponent,
  // }


//];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,

    FormsModule,
    ButtonsModule,
    InputsModule,
    GridModule,
    CarouselModule,
    CardModule,
    ChartModule
  
  ],

  declarations: [
    AdminDashboardComponent,
    SalesRatioComponent,
    FeedsComponent,
    CustomerDetailsComponent,
    TopCardsComponent,
    BlogCardsComponent,
    FoodItemComponent,
    DiningTableComponent,
    ReviewComponent,
    FoodCategoryComponent,
    OrderDetailComponent,
    // NavigationComponent,
    // SidebarComponent
  ],
  //bootstrap : [CustomerDetailsComponent]
  exports: []
})


export class DashboardModule {}
