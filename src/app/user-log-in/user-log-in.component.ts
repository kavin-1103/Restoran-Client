import { Component } from '@angular/core';

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.scss']
})
export class UserLogInComponent {


  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
