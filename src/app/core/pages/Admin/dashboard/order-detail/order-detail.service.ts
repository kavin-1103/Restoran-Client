import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable,} from 'rxjs';


import { environment } from 'environments/environment';


const BASE_URL = `${environment.baseUrl}/FoodItemsControllerAdmin`;


@Injectable({
    providedIn: 'root'
  })
  export class OrderDetailService {
    constructor(private http: HttpClient) {}
  
    getAllOrderDetails(): Observable<any> {
        const url = `${environment.baseUrl}/FoodOrder/GetAllOrders`;
        return this.http.get<any>(url);
    }
    
    
  }





