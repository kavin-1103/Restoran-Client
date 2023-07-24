
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

// import { DatePipe } from '@angular/common';
// //import { FoodItem, Order, ApiResponse } from './models'; // Import the interfaces

// export interface FoodItem {
//   foodItem: string;
//   quantity: number;
//   price: number;
// }

// export interface Order {
//   orderId: number;
//   orderDate: string;
//   reservationDate: string;
//   tableNumber: number;
//   foodItems: FoodItem[];
// }

// export interface ApiResponse {
//   data: Order[];
//   success: boolean;
//   message: string;
// }

// export interface PageEvent {
//   first: number;
//   rows: number;
//   page: number;
//   pageCount: number;
// }

// @Component({
//   selector: 'app-my-orders',
//   templateUrl: './my-orders.component.html',
//   styleUrls: ['./my-orders.component.scss']
// })
// export class MyOrdersComponent implements OnInit {
//   orderIndex: number = 0;
//   orders: Order[] = [];
//   pageIndex: number = 1;
//   pageSize: number = 1;
//   orderForm: FormGroup;

//   first: number = 0;
//   rows: number = 10;

//   constructor(private http: HttpClient, private fb: FormBuilder ,  private datePipe: DatePipe) {
//     this.orderForm = this.fb.group({
//       orders: this.fb.array([]),
//     });
//   }

//   ngOnInit() {
  
//     this.getOrdersFromBackend();
//   }

//   getOrdersFromBackend() {
//     const url = 'https://localhost:7135/api/OrdersControllerUser/GetOrdersOfCustomer';
    

//     this.http.get<ApiResponse>(url).subscribe(
//       (response) => {
//         if (response.success) {
//           this.orders = response.data;
//           this.populateFormArray();
//         } else {
//           console.log('Error fetching data:', response.message);
//         }
//       },
//       (error) => {
//         console.log('Error fetching data:', error);
//       }
//     );
//   }

//   populateFormArray() {
//     const ordersFormArray = this.orderForm.get('orders') as FormArray;
//     ordersFormArray.clear();

//     for (const order of this.orders) {
//       const foodItemsArray = this.fb.array([]);
//       for (const foodItem of order.foodItems) {
//         const foodItemFormGroup = this.fb.group({
//           foodItem: new FormControl(foodItem.foodItem),
//           quantity: new FormControl(foodItem.quantity),
//           price: new FormControl(foodItem.price),
//         });
//         (foodItemsArray as FormArray).push(foodItemFormGroup);
//       }
      

//       ordersFormArray.push(
//         this.fb.group({
//           orderDate: new FormControl(order.orderDate),
//           reservationDate: new FormControl(order.reservationDate),
//           tableNumber: new FormControl(order.tableNumber),
//           foodItems: foodItemsArray,
//         })
//       );
//     }
//   }

  



//   onPageChange(event: any) {
//     this.first = event.first;
//     this.rows = event.rows;
//   }

  
//   getDisplayedOrders(): Order[] {
//     const start = this.pageIndex * this.pageSize;
//     return this.orders.slice(start, start + this.pageSize);
//   }

//   formatDate(dateString: string | null): string {
//     if (!dateString) {
//       return ''; // Return an empty string for null input (or provide any other default value)
//     }
  
//     const date = new Date(dateString);
//     return this.datePipe.transform(date, 'yyyy-MM-dd') || '';// Handle potential null output from the transform
//   }
  
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

import { DatePipe } from '@angular/common';

import { environment } from 'environments/environment';


export interface FoodItem {
  foodItem: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: number;
  orderDate: string;
  reservationDate: string;
  tableNumber: number;
  foodItems: FoodItem[];
}

export interface ApiResponse {
  data: Order[];
  success: boolean;
  message: string;
}

export interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  orderForm: FormGroup;
  first: number = 0;
  pageIndex: number = 0;
  pageSize: number = 1; // Set the pageSize to 1 to display one order per page

  constructor(private http: HttpClient, private fb: FormBuilder, private datePipe: DatePipe) {
    this.orderForm = this.fb.group({
      orders: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.getOrdersFromBackend();
  }

  getOrdersFromBackend() {
    const url = `${environment.baseUrl}/FoodOrder/GetOrdersOfCustomer`;

    this.http.get<ApiResponse>(url).subscribe(
      (response) => {
        if (response.success) {
          this.orders = response.data;
          this.populateFormArray();
        } else {
          console.log('Error fetching data:', response.message);
        }
      },
      (error) => {
        console.log('Error fetching data:', error);
      }
    );
  }

  populateFormArray() {
    const ordersFormArray = this.orderForm.get('orders') as FormArray;
    ordersFormArray.clear();

    for (const order of this.orders) {
      const foodItemsArray = this.fb.array([]);
      for (const foodItem of order.foodItems) {
        const foodItemFormGroup = this.fb.group({
          foodItem: new FormControl(foodItem.foodItem),
          quantity: new FormControl(foodItem.quantity),
          price: new FormControl(foodItem.price),
        });
        (foodItemsArray as FormArray).push(foodItemFormGroup);
      }

      ordersFormArray.push(
        this.fb.group({
          orderDate: new FormControl(order.orderDate),
          reservationDate: new FormControl(order.reservationDate),
          tableNumber: new FormControl(order.tableNumber),
          foodItems: foodItemsArray,
        })
      );
    }
  }

  onPageChange(event: any) {
    this.pageIndex = event.page; // Update the pageIndex with the current page number
  }

  getDisplayedOrders(): Order[] {
    const start = this.pageIndex * this.pageSize;
    return this.orders.slice(start, start + this.pageSize);
  }

  formatDate(dateString: string | null): string {
    if (!dateString) {
      return ''; // Return an empty string for null input (or provide any other default value)
    }

    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || ''; // Handle potential null output from the transform
  }
}
