import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from "primeng/carousel";
import { ButtonModule } from "primeng/button";
import { ImageModule } from "primeng/image";
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { IntlModule } from "@progress/kendo-angular-intl";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { FormFieldModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { HttpClientModule  } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import {  NgChartsModule } from 'ng2-charts';
import { ChartModule } from 'primeng/chart';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table'; 
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { KnobModule } from 'primeng/knob';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { GridModule } from '@progress/kendo-angular-grid';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { AdminModule } from './core/pages/Admin/admin.module';
import { CustomerModule } from './core/pages/Customer/customer.module';
import { DashboardModule } from './core/pages/Admin/dashboard/dashboard.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UnAuthorizedComponent } from './core/pages/UnAuthorized/admin-restricted.component';
import { SharedModule } from './shared/customer-shared/customer-shared.module';
import { PageNotFoundComponent } from './core/pages/PageNotFound/page-not-found/page-not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    UnAuthorizedComponent,
    PageNotFoundComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    ImageModule,
    CommonModule,
    ReactiveFormsModule,
    IntlModule,
    LabelModule,
    ButtonsModule,
    DateInputsModule,
    FormFieldModule,
    HttpClientModule, 
    ConfirmDialogModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    NgChartsModule,
    ChartModule,
    MatCardModule,
    MatChipsModule,
    MatTabsModule,
    MatGridListModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    TablerIconsModule.pick(TablerIcons),
    KnobModule,
    ProgressSpinnerModule,
    PaginatorModule,
    DialogModule,
    PasswordModule,
    CardModule,
    GridModule,
    TableModule,
    MenuModule,
    NgOtpInputModule,
    NgbModule,
    RouterModule.forRoot(routes, {useHash:false}),
    NgxSpinnerModule,
    CustomerModule,
    AdminModule,
    DashboardModule,SharedModule
  ],

  exports:[  
    TablerIconsModule, 
    ToastModule,
  ],

  providers: [ConfirmationService,
    MessageService,DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  
  bootstrap: [AppComponent]
})


export class AppModule {}
