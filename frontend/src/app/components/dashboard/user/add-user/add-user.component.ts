import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router) {
      
      this.addUserForm = this.fb.group({
        firstName: new FormControl(),
        middleName: new FormControl(), 
        lastName: new FormControl(), 
        phoneNumber: new FormControl(),
        email: new FormControl(), 
      })
  }

  addUser(): void{}
    
  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {
  }

}
