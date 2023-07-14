// // app.component.ts

// import { Component, OnInit } from '@angular/core';
// import { DashboardService } from 'app/Services/dashboard.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.scss']
// })
// export class AdminDashboardComponent implements OnInit{
//   // Variables and properties
//   activeTab: string = 'home';
//   data: any[] = []; // Placeholder data for the Kendo UI Grid
//   gridHeight = 400; // Height of the Kendo UI Grid
//   first = 0; // First row index for the paginator
//   rows = 10; // Number of rows per page for the paginator
//   totalRecords = 0; // Total number of records for the paginator
//   customerDetails : any;

//   constructor(private dash:DashboardService)
//   {

//   }

//   ngOnInit(): void {
      
//     this.dash.getAllCustomers().subscribe((response:any)=>
//     {
//       this.customerDetails = response.data;
//       console.log(this.customerDetails);
//     })
    
//   }
//   // Methods
//   isAdminLoggedIn(): boolean {
//     // Add your authentication logic here
//     return true;
//   }

//   onPageChange(event: any): void {
//     this.first = event.first;
//     this.rows = event.rows;
//     // Add your pagination logic here
//   }
//   setActiveTab(tab: string): void {
//     this.activeTab = tab;
//     // Add logic to handle the selected tab
//   }

//   logout(): void {
//     // Add logout logic here
//   }
// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
// import { Product } from '../../api/product';
// import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
// import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardService } from 'app/Services/dashboard.service';

@Component({
    templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  activeTab: string = 'home';


    items!: MenuItem[];

    // products!: Product[];
    products!: any[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    customerDetails : any;

    constructor(private dashboardService: DashboardService, ) {
        
    }

    ngOnInit() {
        this.initChart();
        this.dashboardService.getAllCustomers().subscribe((response:any)=>
      {
        this.customerDetails = response.data;
        console.log(this.customerDetails);
      })
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    setActiveTab(tab: string): void {
          this.activeTab = tab;
          // Add logic to handle the selected tab
        }
      
        logout(): void {
          // Add logout logic here
        }
}