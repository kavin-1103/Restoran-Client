export interface OrderDetail {
    orderId: number;
    customerId: string;
    customerName: string;
    tableId: number;
    tableNumber: number;
    orderDate: string;
    orderItems: OrderItem[];
  }
  
  
  export interface OrderItem {
    foodItemId: number;
    itemName: string;
    quantity: number;
  }
  