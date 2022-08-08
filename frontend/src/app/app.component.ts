import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MIU GCC Booking System';
  constructor(private userService: UserService, private router: Router) {
    this.userService.refreshState();
    const userState = this.userService.getUserState();
    if (userState?.role === 'admin') {
      this.router.navigate(['/dashboard']);
    } else if (userState?.role === 'user') {
      this.router.navigate(['/booking']);
    } else {
      this.userService.logout();
      this.router.navigate(['/login']);
    }
  }
}
