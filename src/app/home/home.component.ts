import { Component } from '@angular/core';
import { AuthenticationService } from 'app/Services/autherntication-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

constructor(private authService : AuthenticationService)
{}
  isLoggedIn(){

  }
}
