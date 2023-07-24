import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { FormGroup } from '@angular/forms';
import { Order } from 'app/core/pages/Customer/menu-item/menu-item.component';

interface ServiceResponse<T> {
    Success: boolean;
    Message: string;
    data: T;
  }


  const BASE_URL = `${environment.baseUrl}`;


@Injectable({
    providedIn: 'root'
  })

  export class CustomerService {
    constructor(private http: HttpClient) {}



    getAllFoodItems(): Observable<ServiceResponse<any>> {
      const url = `${environment.baseUrl}/FoodItem`;
      return this.http.get<ServiceResponse<any>>(url);
    }

    getAllCategories() : Observable<ServiceResponse<any>>
    {
        const url = `${environment.baseUrl}/MenuCategory`;
        return this.http.get<ServiceResponse<any>>(url);
    }

    getFoodItemByCategory(categoryId : number) : Observable<ServiceResponse<any>>
    {
        const url = `${environment.baseUrl}/FoodItem/GetFoodItemByCategory?id=${categoryId}`;
        return this.http.get<ServiceResponse<any>>(url);
    }

    placeOrder(order : Order):Observable<any>
    {
      const url = `${environment.baseUrl}/FoodOrder`;
      return this.http.post<any>(url , order);
    }

    deleteReservation(reservationId: number): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${environment.baseUrl}/customer/Reservation/${reservationId}`;
    
        return this.http.delete(url, { headers });
      }

      getProfileDetails(): Observable<any>
      {
        const url = `${environment.baseUrl}/RegisteredCustomer/GetCustomerDetails`;
        return this.http.get<any>(url);
      }
   
}