import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registration_failed_message = "Invalid Data";
  registration_faileds = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: new FormControl(),
      middleName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      password: new FormControl()
    });
  }
  ngOnInit(): void {
  }

  register(): void {
    this.userService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      }, error: (err) => {
        this.registration_faileds = true;
        this.registration_failed_message = err.error.message;
        console.log(err);
      }
    });
  }

}