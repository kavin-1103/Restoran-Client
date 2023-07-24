import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of, zip } from 'rxjs';

import { OrderDetail } from './order-detail-data';
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





