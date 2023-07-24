import { PasswordModule } from "primeng/password";


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";

import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { NgOtpInputModule } from  'ng-otp-input';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    NavbarComponent,
    ContactComponent,
    FooterComponent,
    
],
  imports: [
    CommonModule,
    PasswordModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    NgOtpInputModule,
    RouterModule
],
exports: [
    NavbarComponent,
    ContactComponent,
    FooterComponent,

],
providers: [MessageService]
})
export class SharedModule { }
