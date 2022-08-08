import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { BookingsService } from 'src/app/services/booking/bookings.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookAdminForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private bookingService: BookingsService,
    private router: Router) { 

      this.bookAdminForm = this.fb.group({
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
        occcupants: new FormControl(),
        arrivalTime: new FormControl(),
        numberOfGuests: new FormControl()
      })
  }

  ngOnInit(): void {
  }

  addBookAdmin(): void{
    const checkInDate = new Date(this.bookAdminForm.value.checkInDate).getTime();
    const checkOutDate = new Date(this.bookAdminForm.value.checkOutDate).getTime();
    const middleName = this.bookAdminForm.value.middleName ? this.bookAdminForm.value.middleName : '';
    const guest = this.bookAdminForm.value.guest ? this.bookAdminForm.value.guest : '';
    const staff = this.bookAdminForm.value.staff ? this.bookAdminForm.value.staff : '';
    const student = this.bookAdminForm.value.student ? this.bookAdminForm.value.student : '';
    const body = {
      firstName: this.bookAdminForm.value.firstName,
      middleName: middleName, 
      lastName: this.bookAdminForm.value.lastName, 
      phoneNumber: this.bookAdminForm.value.phoneNumber,
      email: this.bookAdminForm.value.email, 
      guest: guest, 
      staff: staff,  
      student: student,
      checkOutDate: checkInDate,
      checkInDate: checkOutDate,
      purposeOfStay: this.bookAdminForm.value.purposeOfStay,
      accessibleRequired: this.bookAdminForm.value.accessibleRequired,
      occcupants: this.bookAdminForm.value.occcupants,
      arrivalTime: this.bookAdminForm.value.arrivalTime,
      numberOfGuests: this.bookAdminForm.value.numberOfGuests
    }
    console.log("---body---", body);

    this.bookingService.addBookUser(body)
      .subscribe(
        {
          next: (response)=>{
            this.userService.userState$.next(response);
            this.userService.persistState();
            this.router.navigate(['/', 'booking']);
          },
          error:(err)=>{
            // this.registration_faileds = true;
            console.log(err);
          }
        }
      );
  }

  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

}
