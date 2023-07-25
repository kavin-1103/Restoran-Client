import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { DatePipe } from '@angular/common';
import {GridDataResult} from "@progress/kendo-angular-grid";
import { DataResult, State, process } from "@progress/kendo-data-query";
import { OrderDetail , OrderItem} from './order-detail-data';
import { OrderDetailService } from './order-detail.service';
import { map } from "rxjs/operators";


@Component({
  selector: 'app-food-item',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailService,DatePipe],
})

export class OrderDetailComponent implements OnInit {
  public view?: Observable<GridDataResult>;
  public orderDetails: OrderDetail[] = []; 

  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  constructor(private orderDetailService: OrderDetailService, private datePipe : DatePipe) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    this.view = this.orderDetailService.getAllOrderDetails().pipe(
      map((response: any) => {
        if (response && response.data) {
          const processedData: DataResult = process(response.data, this.gridState);

          const dataWithFormattedOrderDate = processedData.data.map((item: any) => {
            return {
              ...item,
              orderDate: this.formatOrderDate(item.orderDate),
            };
          });

          return {
            data: dataWithFormattedOrderDate,
            total: processedData.total,
          };
        }
        return {
          data: [],
          total: 0,
        };
      })
    );
  }

  private formatOrderDate(orderDate: string): string {
    const date = new Date(orderDate);
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
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


  public dataStateChange(state:any) : void
  {
    this.gridState = state;
    this.getOrderDetails();
  }
  

  private mapOrderItem(data: any): OrderItem {
    return {
      foodItemId: data.foodItemId,
      itemName: data.itemName,
      quantity: data.quantity,
    };
  }
}
