import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['../../dashboard.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  user_id?: string;

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {
      
      this.editUserForm = this.fb.group({
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

  editUser(): void {
    const roomData = {
      firstName: this.editUserForm.value.firstName,
      middleName: this.editUserForm.value.middleName,
      lastName: this.editUserForm.value.lastName, 
      gender: this.editUserForm.value.gender,
      password: this.editUserForm.value.password,
      // password: 123456,
      phone: this.editUserForm.value.phone,
      email: this.editUserForm.value.email,
      role: this.editUserForm.value.role
    }
    this.userService.updateUser(roomData, this.user_id)
      .subscribe(
        {
          next: (response: any) => {
            this.router.navigate(['/', 'dashboard', 'user']);
            this.openSnackBar(response.message, 'Close');
            // this.resetForm();
          },
          error: (err: any) => {
            this.openSnackBar(err.error.message, 'Close');
            console.log(err);
          }
        }
      );
  }

  resetForm(): void {
    this.editUserForm.reset();
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
    this.user_id = this.route.snapshot.params['user_id'];
    this.getUserById(this.user_id);
  }
  
  getUserById(room_id?: string): void {
    this.userService.getUserById(room_id).subscribe({
      next: (response: any) => {
        // console.log("--response--", response);
        this.editUserForm.patchValue({
          firstName: response.data.firstName,
          middleName: response.data.middleName,
          lastName: response.data.lastName,
          // password: response.data.password,
          password: 123456,
          gender: response.data.gender,
          phone: response.data.phone,
          email: response.data.email,
          role: response.data.role
        });
      },
      error: (err: any) => {
        console.log("--err getting booking by ID--", err);
      }
    })
  }

}
