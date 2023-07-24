import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PopularComponent } from './popular/popular.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { SharedModule } from 'app/shared/customer-shared/customer-shared.module';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    HomeComponent,
    PopularComponent,
    TestimonialComponent,
],
  imports: [
    CommonModule,
    CarouselModule,
    ImageModule,
    SharedModule,
    RouterModule,
    ToastModule
],
providers:[MessageService]
})


export class HomeModule { }
