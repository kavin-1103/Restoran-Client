import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './admin-functions.routing';

import { FoodItemComponent } from './food-item/food-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DiningTableComponent } from './dining-table/dining-table.component';
import { ReviewComponent } from './review/review.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
   
  ],
  declarations: [

    FoodItemComponent,
    OrderDetailComponent,
    DiningTableComponent,
    ReviewComponent
  ],
})

export class AdminFunctionModule{}