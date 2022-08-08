import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['../../dashboard.component.css']
})
export class AddRoomComponent implements OnInit {
  addRoomForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router) {
      
      this.addRoomForm = this.fb.group({
        buildingNumber: new FormControl(),
        roomNumber: new FormControl(), 
        isAccessible: new FormControl(), 
        maxOccupancy: new FormControl(),
        floor: new FormControl(),
        image: new FormControl(),
        
      firstName: new FormControl(),
      middleName: new FormControl(), 
      lastName: new FormControl(), 
      phoneNumber: new FormControl(),
      email: new FormControl(), 
      staff: new FormControl(), 
      student: new FormControl(),
      guest: new FormControl(), 
      checkOutDate: new FormControl(),
      checkInDate: new FormControl(),
      purposeOfStay: new FormControl(),
      accessibleRequired: new FormControl(),
      discountOf: new FormControl(),
      occcupants: new FormControl(),
      paidInCash: new FormControl(),
      discountType: new FormControl(),
      roomType: new FormControl(),
      })
  }

  addRoom(): void{}
    
  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {
  }

}
