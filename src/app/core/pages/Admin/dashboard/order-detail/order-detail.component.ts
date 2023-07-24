import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import {
  GridDataResult,
} from "@progress/kendo-angular-grid";

import { State, process } from "@progress/kendo-data-query";

import { Keys } from "@progress/kendo-angular-common";

import { OrderDetail , OrderItem} from './order-detail-data';
import { OrderDetailService } from './order-detail.service';
import { map } from "rxjs/operators";


@Component({
  selector: 'app-food-item',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailService],
})

export class OrderDetailComponent implements OnInit {
  public view?: Observable<GridDataResult>;
  public orderDetails: OrderDetail[] = []; // Initialize as an empty array

  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  constructor(private orderDetailService: OrderDetailService) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    this.view = this.orderDetailService.getAllOrderDetails().pipe(
      map((response: any) => {
        if (response && response.data) {
          return response.data.map((item: any) => this.mapOrderDetail(item));
        }
        return [];
      })
    );
  }

  private mapOrderDetail(data: any): OrderDetail {
    const orderDate = new Date(data.orderDate);
    const formattedOrderDate = orderDate.toLocaleDateString(); // Format the order date as a string
  
    return {
      orderId: data.orderId,
      customerId: data.customerId,
      customerName: data.customerName,
      tableId: data.tableId ?? 0,
      tableNumber: data.tableNumber ?? 0,
      orderDate: formattedOrderDate, // Use the formatted order date
      orderItems: data.orderItems.map((item: any) => this.mapOrderItem(item)),
    };
  }
  

  private mapOrderItem(data: any): OrderItem {
    return {
      foodItemId: data.foodItemId,
      itemName: data.itemName,
      quantity: data.quantity,
    };
  }
}
