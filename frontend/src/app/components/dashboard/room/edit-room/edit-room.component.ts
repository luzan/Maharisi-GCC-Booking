import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['../../dashboard.component.css']
})
export class EditRoomComponent implements OnInit {
  editRoomForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router) {
      
      this.editRoomForm = this.fb.group({
        buildingNumber: new FormControl(),
        roomNumber: new FormControl(), 
        isAccessible: new FormControl(), 
        maxOccupancy: new FormControl(),
        floor: new FormControl(),
        image: new FormControl()
      })
  }

  editRoom(): void{}
    
  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {
  }

}
