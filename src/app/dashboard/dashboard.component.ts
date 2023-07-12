import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('valueChange', [
      state('0', style({ transform: 'rotate(0deg)' })),
      state('75', style({ transform: 'rotate(270deg)' })),
      transition('0 <=> 75', animate('2s ease'))
    ]),
    trigger('valueAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('500ms', style({ opacity: 1, transform: 'scale(1.2)' })),
        animate('500ms', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})


export class DashboardComponent implements OnInit {

  first: number = 0;

  rows: number = 10;


  data! : any[] ;
  sidebarVisible = false;
  activeMenu: string = 'dashboard';
  value : number= 0 ;
  amount: number =0;
  targetAmount: number = 10000;
  
  chartData: any;
  chartOptions: any;

  menuItems: MenuItem[] = [
    { label: 'HOME' },
    { label: 'Settings' }
  ];

  lineChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55], label: 'Peak Hours' }
  ];

  lineChartLabels: any[] = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];
  lineChartOptions: any = {
    responsive: true
  };
  lineChartLegend = true;
  lineChartType = 'line';


  isButtonActive: boolean[] = [false, false, false, false];

  

  
  tableHeaders = [
    'Name',
    'Phone Number',
    'Mail Id'
  ];
  
    constructor(private http : HttpClient)
    {}

  ngOnInit() {
    
    this.animateValue();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    setTimeout(() => {
      this.value = 75; // Set the desired value
    }, 1000); 

    this.chartData = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
      datasets: [
        {
          label: 'Number of Orders',
          data: [10, 20, 15, 25, 30, 20]
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
}
updateChart() {
  const newOrderCount = Math.floor(Math.random() * 10) + 1;
  this.chartData.datasets[0].data.push(newOrderCount);
  this.chartData.labels.push(`Day ${this.chartData.labels.length + 1}`);
}

  toggle()
  {
      $('.sidebar').toggle();
  }

  isActive(menu: string): boolean {
    return this.activeMenu === menu;
  }

  setActive(menu: string): void {
    this.activeMenu = menu;
  }

  fetchData() {
    this.http.get<any>('your-api-endpoint').subscribe(response => {
      this.data = response;
    });
  }

  animateValue() {
    const animationDuration = 1000; // milliseconds
    const steps = 50;
    const stepValue = this.targetAmount / steps;

    let currentStep = 0;

    const intervalId = setInterval(() => {

      currentStep++;
      this.amount = currentStep * stepValue;

      if (currentStep === steps) {
        this.amount = this.targetAmount;
        clearInterval(intervalId);
      }
    }, animationDuration / steps);
  }

 

  toggleButtonActive(index: number): void {
    this.isButtonActive = this.isButtonActive.map((value, i) => i === index ? !value : false);
  }

 
    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }


    activeTab = 'home'; // Initially set the 'home' tab as active

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
