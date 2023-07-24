import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/core/services/AuthService/auth.service';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports:[NgbDropdownModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();


  public showSearch = false;

  constructor(private modalService: NgbModal, private authService : AuthenticationService) {
  }

  ngAfterViewInit() { }
  
  adminLogOut()
  {
      this.authService.logout();
  }
}
