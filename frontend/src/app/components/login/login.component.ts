import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm!: FormGroup;

  email_required = "Email is required";
  password_required = "Password is required";
  registration_failed_message = "Email or Password are not correct";
  registration_faileds = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  login(): void {
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        {
          next: (response) => {
            this.userService.userState$.next(response);
            this.userService.persistState();
            const userState = this.userService.getUserState();
            if (userState?.role === 'admin') {
              this.router.navigate(['/dashboard']);
            } else if (userState?.role === 'user') {
              this.router.navigate(['/booking']);
            } else {
              this.userService.logout();
              this.router.navigate(['/login']);
            }
          },
          error: (err) => {
            this.registration_faileds = true;
            this.registration_failed_message = err.error.message;
            console.log(err);
          }
        }
      );
  }

}
