import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { BookingsService } from 'src/app/services/booking/bookings.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookAdminForm!: FormGroup;
  user_id?: string;
  listOfDashboard: any;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private bookingService: BookingsService,
    private router: Router, private snackBar: MatSnackBar) {

    this.bookAdminForm = this.fb.group({
      userId: new FormControl(),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      bookingFor: new FormControl(null, [Validators.required]),
      checkOutDate: new FormControl(null, [Validators.required]),
      checkInDate: new FormControl(null, [Validators.required]),
      purposeOfStay: new FormControl(),
      accessibleRequired: new FormControl(),
      occcupants: new FormControl(),
      arrivalTime: new FormControl(),
      numberOfGuests: new FormControl(),
      roomType: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.user_id = this.userService.getUserState()?.user_id;
    this.getBookingHistory();
  }
  getBookingHistory(): void {
    this.bookingService.getAllBookingDataOfUser(this.user_id).subscribe({
      next: (response: any) => {
        this.listOfDashboard = response.data;
      },
      error: (err: any) => { }
    })
  }
  addBookAdmin(): void {
    const checkInDate = new Date(this.bookAdminForm.value.checkInDate).getTime();
    const checkOutDate = new Date(this.bookAdminForm.value.checkOutDate).getTime();
    const arrivalTime = new Date(this.bookAdminForm.value.arrivalTime).getTime();
    const middleName = this.bookAdminForm.value.middleName ? this.bookAdminForm.value.middleName : '';
    const userState = this.userService.getUserState();
    const body = {
      userId: userState?.user_id,
      firstName: this.bookAdminForm.value.firstName,
      middleName: middleName,
      lastName: this.bookAdminForm.value.lastName,
      phoneNumber: this.bookAdminForm.value.phoneNumber,
      email: this.bookAdminForm.value.email,
      bookingFor: this.bookAdminForm.value.bookingFor,
      checkOutDate: checkInDate,
      checkInDate: checkOutDate,
      purposeOfStay: this.bookAdminForm.value.purposeOfStay,
      accessibleRequired: this.bookAdminForm.value.accessibleRequired === "true" ? true : false,
      occcupants: this.bookAdminForm.value.occcupants,
      arrivalTime: arrivalTime,
      numberOfGuests: this.bookAdminForm.value.numberOfGuests,
      roomType: this.bookAdminForm.value.roomType
    }
    console.log("---body---", body);

    this.bookingService.addBookUser(body)
      .subscribe(
        {
          next: (response) => {
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

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  resetForm(): void {
    this.bookAdminForm.reset();
  }


}
