import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';
import { DashboardService } from 'app/core/services/AdminService/dashboard.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
  styleUrls: ['./top-cards.styles.scss']
})
export class TopCardsComponent implements OnInit {

  topcards:topcard[];

  constructor(private dashboardService : DashboardService) { 
    
    this.topcards=topcards;
  }

  ngOnInit(): void {

    this.dashboardService.getCustomerCount().subscribe((response:any)=>{
     
      this.topcards[0].total = response.data ;

    })
    this.dashboardService.getFoodItemCount().subscribe((response:any)=>
    {
    
      this.topcards[2].total = response.data ;
    })

    this.dashboardService.getTotalTables().subscribe((response:any)=>
    {
   
      this.topcards[1].total = response.data ;
    })


    this.dashboardService.getTotalOrders().subscribe((response:any)=>
    {
      
      this.topcards[3].total = response.data ;
    })

    




  }

}
