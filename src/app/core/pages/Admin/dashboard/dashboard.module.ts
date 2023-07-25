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

import { CarouselModule } from 'primeng/carousel';

import { CardModule } from "primeng/card";
import { FoodCategoryComponent } from "./food-category/food-category.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

import { ChartModule } from 'primeng/chart';
import { ToastModule } from "primeng/toast";


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
    FoodCategoryComponent,
    OrderDetailComponent,
  ],
  exports: []
})


export class DashboardModule {}
