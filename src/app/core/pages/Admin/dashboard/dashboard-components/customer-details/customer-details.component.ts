import { Component, OnInit } from '@angular/core';
import {CustomerDetails ,Customer} from './customer-details-data';
import { DashboardService } from 'app/core/services/AdminService/dashboard.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls : ["./customer-details.component.styles.scss"],
})
export class CustomerDetailsComponent implements OnInit {

  customers:any[];

  gridData: any[]= [] ;

 
  public pageSize = 5;
  public buttonCount = 2;
  public sizes = [10, 20, 50];


  constructor(private dashboardService : DashboardService) { 

    this.customers=CustomerDetails;
  }

  ngOnInit(): void {

    this.dashboardService.getAllCustomers().subscribe((response:any)=>{
      this.customers = response.data;
      this.gridData = response.data;
      console.log(this.gridData);
      console.log(this.customers);
    })
  }

}
