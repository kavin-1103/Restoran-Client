import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

interface ServiceResponse<T> {
  Success: boolean;
  Message: string;
  Data: T;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<ServiceResponse<any[]>> {
    const url = `${environment.baseUrl}/RegisteredCustomer`;
    return this.http.get<ServiceResponse<any[]>>(url);
  }
  

  getCustomerCount(): Observable<ServiceResponse<any>>
  {
    const url = `${environment.baseUrl}/RegisteredCustomer/CustomerCount`;
    return this.http.get<ServiceResponse<any>>(url);
  }


  getFoodItemCount() : Observable<ServiceResponse<any>>
  {
    const url = `${environment.baseUrl}/FoodItem/CountFoodItems`;
    return this.http.get<ServiceResponse<any>>(url);
  }
   

  getReviews(): Observable<ServiceResponse<any[]>>
  {
    const url = `${environment.baseUrl}/CustomerReviews`;
    return this.http.get<ServiceResponse<any>>(url);
  }


  getTotalTables() : Observable<ServiceResponse<any[]>>
  {
    const url = `${environment.baseUrl}/DiningTable/total-table-count`;
    return this.http.get<ServiceResponse<any>>(url);
  }


  getTotalOrders() : Observable<ServiceResponse<any[]>>
  {
    const url = `${environment.baseUrl}/FoodOrder/total-order-count`;
    return this.http.get<ServiceResponse<any>>(url);
  }


  getorderDetailsPerDay() : Observable<any[]>
  {
    const url = `${environment.baseUrl}/FoodOrder/GetOrderCountForLast7Days`;
    return this.http.get<any>(url);
  }

  
}
