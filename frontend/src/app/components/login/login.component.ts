import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['lbaral@miu.edu'],
      password: ['Luzan12345']
    })
  }

  login(): void {
    // console.log("==this.loginForm.value.email==", this.loginForm.value.email);
    // console.log("==this.loginForm.value.password==", this.loginForm.value.password);

    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(response => {
        // set the state
        this.userService.userState$.next(response);
        this.userService.persistState();
        this.router.navigate(['/', 'dashboard']);
        // console.log(this.userService.getUserState())
      })
  }

}
