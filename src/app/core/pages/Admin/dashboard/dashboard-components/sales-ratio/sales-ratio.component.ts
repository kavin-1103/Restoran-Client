import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'app/core/services/AdminService/dashboard.service';



@Component({
  selector: 'app-sales-ratio',
  templateUrl: './sales-ratio.component.html',
  styleUrls : ["./sales-ratio.component.styles.scss"]
})
export class SalesRatioComponent implements OnInit {



  


  data: any;
  options: any;

  constructor(private databaseService : DashboardService) {}

  ngOnInit(): void {

    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.databaseService.getorderDetailsPerDay().subscribe(
          (response: any) => {
            console.log("Order Details Per day Fetched");

            const dates = response.dates;
            const counts = response.counts;


            
              this.data = {
                labels: dates,
                datasets: [
                  {
                    label: 'Orders per day',
                    data: counts,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                  }
                ]
              };

              this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
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

          },
          (error: any) => {
            // Handle error response
            console.error(error);
            console.log('Status:', error.status);
            console.log('Message:', error.message);
            console.log('Errors:', error.error.errors);
            }
        );


        
  }

}
