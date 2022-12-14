import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { Dashboard } from '../../services/dashbaord/DashboardInterface';
import { BookingsService } from '../../services/booking/bookings.service';
import { DashboardsService } from '../../services/dashbaord/dashboards.service';
import { GetDashboard } from '../../services/dashbaord/GetDashboardInterface';
import { RoomService } from 'src/app/services/room/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bookForm!: FormGroup;
  checkInCheckOutForm!: FormGroup;
  contactForm!: FormGroup;
  isLinear = true;
  availableRooms?: any;
  listOfDashboard: any;
  summary: any = {
    roomCount: 0,
    bookingCount: 0,
    checkinCount: 0,
    userCount: 0,
  };

  @ViewChild('stepper') stepper: any;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private roomService: RoomService,
    private bookingService: BookingsService,
    private dashboardService: DashboardsService,
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


    this.bookForm = this.fb.group({
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
    this.getUpcomingBookings();
    this.getSummaryReport();
  }

  getSummaryReport(): void {
    this.dashboardService.getSummaryReport().subscribe({
      next: (response: any) => {
        console.log("--response--", response);
        this.summary = response.data;
      }
    });
  }

  getUpcomingBookings(): void {
    this.bookingService.getBookingDataForDashboard().subscribe({
      next: (response: any) => {
        console.log("--response--", response);
        this.listOfDashboard = response.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getRoomDetails(): void {

  }

  getSelectedRoom(e: any): void {
    let roomData = e.source.triggerValue.split(' - ');
    this.bookForm.patchValue({
      roomId: e.value,
      building: roomData[0],
      roomNumber: roomData[1],
      totalPrice: roomData[2],
      roomType: roomData[3]
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

  addBooking(): void {
    console.log("--this.loginForm.value--", this.bookForm.value);
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
      discountType: this.bookForm.value.discountType,
      discountOf: this.bookForm.value.discountOf,
      occcupants: this.bookForm.value.occcupants,
      paidInCash: this.bookForm.value.paidInCash,
      roomNumber: this.bookForm.value.roomNumber,
      building: this.bookForm.value.building,
      roomType: this.checkInCheckOutForm.value.roomType,
      roomId: this.bookForm.value.roomId,
      pricePerNight: this.bookForm.value.totalPrice,
    }
    console.log("---bookingData---", bookingData);

    this.bookingService.addBookingAdmin(bookingData)
      .subscribe(
        {
          next: (response: any) => {
            this.openSnackBar(response.message, 'Close');
            this.resetForm();
            this.stepper.reset();
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
    this.bookForm.markAsPristine();
    this.checkInCheckOutForm.markAsPristine();
    this.contactForm.markAsPristine();
  }

}
