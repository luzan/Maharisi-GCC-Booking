import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user/user.service';
import { BookingsService } from 'src/app/services/booking/bookings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['../booking.component.css']
})

export class EditBookingComponent implements OnInit {
  bookAdminForm!: FormGroup;
  booking_id?: string;
  user_id?: string;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private bookingService: BookingsService,
    private router: Router,
    private snackBar: MatSnackBar) {

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
      building: new FormControl(),
      roomType: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.booking_id = this.route.snapshot.params['booking_id'];
    this.user_id = this.userService.getUserState()?.user_id;
    this.getBookingById(this.booking_id);
  }

  getBookingById(bookingId?: string): void {
    this.bookingService.getBookingById(bookingId).subscribe({
      next: (response: any) => {
        console.log(formatDate(new Date(response.data.checkOutDate), 'dd/MM/yyyy', 'en_US'));
        this.bookAdminForm.patchValue({
          userId: response.data.user.user_id,
          firstName: response.data.user.firstName,
          middleName: response.data.user.middleName,
          lastName: response.data.user.lastName,
          phoneNumber: response.data.user.phoneNumber,
          email: response.data.user.email,
          bookingFor: response.data.bookingFor,
          // checkOutDate: response.data.checkOutDate,
          checkOutDate: formatDate(new Date(response.data.checkOutDate).setHours(12), 'MM/dd/yyyy@HH:mm:ss', 'en_US'),
          checkInDate: response.data.checkInDate,
          purposeOfStay: response.data.purposeOfStay,
          accessibleRequired: response.data.accessibleRequired,
          occcupants: response.data.occcupants,
          arrivalTime: formatDate(new Date(response.data.arrivalTime).setHours(12), 'MM/dd/yyyy@HH:mm:ss', 'en_US'),
          building: response.data.building,
          numberOfGuests: response.data.numberOfGuests,
          roomType: response.data.roomType
        });
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  editBookAdmin(): void {
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
      checkOutDate: checkOutDate,
      checkInDate: checkInDate,
      purposeOfStay: this.bookAdminForm.value.purposeOfStay,
      accessibleRequired: this.bookAdminForm.value.accessibleRequired === "true" ? true : false,
      occcupants: this.bookAdminForm.value.occcupants,
      arrivalTime: arrivalTime,
      numberOfGuests: this.bookAdminForm.value.numberOfGuests,
      roomType: this.bookAdminForm.value.roomType
    }
    console.log("---body---", body);

    this.bookingService.updateUserBooking(body, this.booking_id, this.user_id)
      .subscribe(
        {
          next: (response: any) => {
            this.openSnackBar(response.message, 'Close');
            this.resetForm();
            this.router.navigate(['/', 'booking', 'book-history']);
          },
          error: (err: any) => {
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
    this.bookAdminForm.markAsPristine();
  }

}
