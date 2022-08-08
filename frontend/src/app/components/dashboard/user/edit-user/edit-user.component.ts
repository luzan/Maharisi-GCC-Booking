import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['../../dashboard.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router) {
      
      this.editUserForm = this.fb.group({
        firstName: new FormControl(),
        middleName: new FormControl(), 
        lastName: new FormControl(), 
        phoneNumber: new FormControl(),
        email: new FormControl(), 
      })
  }

  editUser(): void{}
    
  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {
  }

}
