import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user/user.service';
import { Dashboard } from '../../../services/dashbaord/DashboardInterface';
import { BookingsService } from '../../../services/booking/bookings.service';
import { DashboardsService } from '../../../services/dashbaord/dashboards.service';
import { GetDashboard } from '../../../services/dashbaord/GetDashboardInterface';
import { RoomService } from 'src/app/services/room/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-booking-admin',
  templateUrl: './edit-booking-admin.component.html',
  styleUrls: ['../dashboard.component.css']
})
export class EditBookingAdminComponent implements OnInit {
  editBookForm!: FormGroup;
  booking_id?: string;
  user_id?: string;

  checkInCheckOutForm!: FormGroup;
  contactForm!: FormGroup;
  isLinear = true;
  availableRooms?: any;
  listOfDashboard: any;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private roomService: RoomService,
    private bookingService: BookingsService,
    private dashboardService: DashboardsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.checkInCheckOutForm = this.fb.group({
      checkInDate: new FormControl(),
      checkOutDate: new FormControl(),
      accessibleRequired: new FormControl(),
      roomType: new FormControl(),
    });

    this.contactForm = this.fb.group({
      firstName: new FormControl(),
      middleName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      bookingFor: new FormControl(),
      purposeOfStay: new FormControl(),
    });


    this.editBookForm = this.fb.group({
      discountType: new FormControl(),
      discountOf: new FormControl(),
      totalPrice: new FormControl(),
      occcupants: new FormControl(),
      roomType: new FormControl(),
      roomId: new FormControl(),
      roomNumber: new FormControl(),
      building: new FormControl(),
      paidInCash: new FormControl()
    })


  }

  ngOnInit(): void {
    this.booking_id = this.route.snapshot.params['booking_id'];
    this.user_id = this.userService.getUserState()?.user_id;
    this.getBookingById(this.booking_id);
  }

  getBookingById(booking_id?: string): void {
    this.bookingService.getBookingById(booking_id).subscribe({
      next: (response: any) => {
        console.log("--response--", response);
        this.editBookForm.patchValue({
          discountType: response.data.discountType,
          discountOf: response.data.discountOf,
          totalPrice: response.data.totalPrice,
          occcupants: response.data.occcupants,
          roomType: response.data.room.roomType,
          roomId: response.data.room.roomId,
          roomNumber: response.data.room.roomNumber,
          paidInCash: response.data.paidInCash
        });
        this.contactForm.patchValue({
          firstName: response.data.user.firstName,
          middleName: response.data.user.middleName,
          lastName: response.data.user.lastName,
          phoneNumber: response.data.user.phoneNumber,
          email: response.data.user.email,
          bookingFor: response.data.bookingFor,
          purposeOfStay: response.data.purposeOfStay
        });
        this.checkInCheckOutForm.patchValue({
          checkInDate: response.data.checkInDate,
          checkOutDate: response.data.checkOutDate,
          accessibleRequired: response.data.accessibleRequired,
          roomType: response.data.room.roomType
        });
      },
      error: (err: any) => {
        console.log("--err getting booking by ID--", err);
      }
    });

  }

  getRoomDetails(): void {

  }

  getSelectedRoom(e: any): void {
    let roomData = e.source.triggerValue.split(' - ');
    this.editBookForm.patchValue({
      roomId: e.value,
      building: roomData[0],
      roomNumber: roomData[1],
      totalPrice: roomData[2]
    });
  }

  checkInOutNext(): void {
    const checkInDate = new Date(this.checkInCheckOutForm.value.checkInDate).getTime();
    const checkOutDate = new Date(this.checkInCheckOutForm.value.checkOutDate).getTime();
    const accessibleRequired = this.checkInCheckOutForm.value.accessibleRequired;
    const roomType = this.checkInCheckOutForm.value.roomType;
    console.log("--accessibleRequired--", accessibleRequired);
    let query = '';
    if (accessibleRequired) {
      query = `available=true&accessibleRequired=true&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`;
    } else {
      query = `available=true&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`;
    }

    this.roomService.getRooms(query).subscribe({
      next: (response: any) => {
        console.log("--response--", response);
        this.availableRooms = response.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  editBooking(): void {
    const checkInDate = new Date(this.checkInCheckOutForm.value.checkInDate).getTime();
    const checkOutDate = new Date(this.checkInCheckOutForm.value.checkOutDate).getTime();
    const middleName = this.contactForm.value.middleName ? this.contactForm.value.middleName : '';
    const bookingData = {
      firstName: this.contactForm.value.firstName,
      middleName: middleName,
      lastName: this.contactForm.value.lastName,
      phoneNumber: this.contactForm.value.phoneNumber,
      email: this.contactForm.value.email,
      bookingFor: this.contactForm.value.bookingFor,
      checkOutDate: checkOutDate,
      checkInDate: checkInDate,
      purposeOfStay: this.contactForm.value.purposeOfStay,
      accessibleRequired: this.checkInCheckOutForm.value.accessibleRequired,
      discountType: this.editBookForm.value.discountType,
      discountOf: this.editBookForm.value.discountOf,
      occcupants: this.editBookForm.value.occcupants,
      paidInCash: this.editBookForm.value.paidInCash,
      roomNumber: this.editBookForm.value.roomNumber,
      building: this.editBookForm.value.building,
      roomType: this.checkInCheckOutForm.value.roomType,
      roomId: this.editBookForm.value.roomId,
      pricePerNight: this.editBookForm.value.totalPrice,
    }
    console.log("---bookingData---", bookingData);

    this.bookingService.updateAdminBooking(bookingData, this.booking_id)
      .subscribe(
        {
          next: (response: any) => {
            this.openSnackBar(response.message, 'Close');
            this.resetForm();
            this.router.navigate(['/dashboard/list-booking']);
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

  getAllBookings(): void {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  resetForm(): void {
    this.editBookForm.reset();
    this.checkInCheckOutForm.reset();
    this.contactForm.reset();
  }

}
