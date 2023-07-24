import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/services/AuthService/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

constructor(private authService : AuthenticationService,private router : Router, private messageService: MessageService)
{}
  

onBookTableClick()
{
  if(this.authService.isAuthenticated())
  {
    this.router.navigateByUrl('/reserve-dining');
  }
  else 
  {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: "You need to log in to book a table.",
    });
  }
  
}


}
