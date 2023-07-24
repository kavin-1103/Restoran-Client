import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerModule } from './core/pages/Customer/customer.module';
import { AdminModule } from './core/pages/Admin/admin.module';
import { UnAuthorizedComponent } from './core/pages/UnAuthorized/admin-restricted.component';



export const routes: Routes = [


  {path:'', redirectTo:'/home', pathMatch: 'full'},
 
  {
    path:'',
    loadChildren : () => import('./core/pages/Customer/customer.module').then((m)=> m.CustomerModule)
  },

  {
    path:'dashboard',
    loadChildren : () => import('./core/pages/Admin/admin.module').then((m)=> m.AdminModule)
  },

  {path:'restricted' , component : UnAuthorizedComponent},
  
  {path: '**', redirectTo: '/404'},
  // { path: '404', component: NotFoundComponent }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CustomerModule,
    AdminModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
