import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['../../dashboard.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar) {
      
      this.addUserForm = this.fb.group({
        firstName: new FormControl(),
        middleName: new FormControl(), 
        lastName: new FormControl(), 
        password: new FormControl(), 
        gender: new FormControl(), 
        phone: new FormControl(),
        email: new FormControl(), 
        role: new FormControl()
      })
  }

  addUser(): void{
    const userDatas = {
      firstName: this.addUserForm.value.firstName,
      middleName: this.addUserForm.value.middleName,
      lastName: this.addUserForm.value.lastName, 
      gender: this.addUserForm.value.gender,
      password: this.addUserForm.value.password,
      phone: this.addUserForm.value.phone,
      email: this.addUserForm.value.email,
      role: this.addUserForm.value.role
    }
    // console.log("---userDatas--", userDatas)
    this.userService.addUser(userDatas)
      .subscribe(
        {
          next: (response: any) => {
            this.openSnackBar(response.message, 'Close');
            this.resetForm();
          },
          error: (err) => {
            this.openSnackBar(err.error.message, 'Close');
            console.log(err);
          }
        }
      );
  }

  resetForm(): void {
    this.addUserForm.reset();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
    
  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {
  }

}
