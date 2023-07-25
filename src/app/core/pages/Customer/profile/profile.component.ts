import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/services/AuthService/auth.service';
import { CustomerService } from 'app/core/services/CustomerService/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  implements OnInit{
  activeItem: string = 'profile';
  showMyOrders: boolean = false;
  userDetails!: ProfileDetails;

  
  constructor(private customerService :  CustomerService, 
              private authService : AuthenticationService,
              private router : Router) {}

  ngOnInit(): void {
    this.customerService.getProfileDetails().subscribe(
      (response:any) => {

        this.userDetails = response.data;

      },
      (error:any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  goToMyOrders() {
    this.showMyOrders = true;
  }


  logOut()
  {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}

export interface ProfileDetails
{
  name : string;
  email : string;
  phone : string;
  numberOfOrders : number;
}
