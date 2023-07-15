import { Routes } from '@angular/router';
import { FoodItemComponent } from './food-item/food-item.component';
import { DiningTableComponent } from './dining-table/dining-table.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ReviewComponent } from './review/review.component';
import { AdminDashboardComponent } from 'app/dashboard copy/dashboard.component';




export const ComponentsRoutes: Routes = [
	{
		path: '',
        component : AdminDashboardComponent,
        
		children: [
            {
                path:'dashboard',
                loadChildren : ()=>
                import ('../dashboard copy/dashboard.module').then((m)=>m.DashboardModule)
              },
			{
				path: 'food-item',
				component: FoodItemComponent
			},
			{
				path: 'dining-table',
				component: DiningTableComponent
			},
			{
				path: 'order-details',
				component: OrderDetailComponent
			},
			{
				path: 'review',
				component: ReviewComponent
			},
		]
	}
];