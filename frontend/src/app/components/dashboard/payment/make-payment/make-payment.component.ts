import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from '../../../../services/user/user.service';
import { BookingsService } from 'src/app/services/booking/bookings.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['../../dashboard.component.css']
})
export class MakePaymentComponent implements OnInit {
  addPaymentForm!: FormGroup;
  cardInfoForm!: FormGroup;
  displayedColumns: string[] = ['checkInDate', 'checkOutDate', 'roomNumber', 'paymentStatus', 'totalAmount'];
  dataSource = new MatTableDataSource();
  booking_id?: string;

  originalPrice?: number;
  discount?: number;
  totalPrice?: number;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private bookingService: BookingsService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,) {

    this.addPaymentForm = this.fb.group({
      firstName: new FormControl(),
      middleName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
      country: new FormControl(),
      state: new FormControl(),
      zipCode: new FormControl(),
      receivedBy: new FormControl(),
    })
    this.cardInfoForm = this.fb.group({
      nameOnCard: new FormControl(),
      cardNumber: new FormControl(),
      cvc: new FormControl(),
      expiryDate: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.booking_id = this.route.snapshot.params['booking_id'];
    this.getBookingInformation();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  getBookingInformation(): void {
    this.bookingService.getBookingById(this.booking_id).subscribe({
      next: (response: any) => {
        this.dataSource.data = this.bookingDataParser(response.data);
        this.originalPrice = response.data.cost.regularPrice;
        this.discount = response.data.cost.totalPrice - response.data.cost.regularPrice;
        this.totalPrice = response.data.cost.totalPrice;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  bookingDataParser(data: any): any[] {
    return [{
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      roomNumber: data.room.roomNumber,
      paymentStatus: data.paymentStatus,
      totalAmount: data.cost.totalPrice
    }];
  }

  getPaymentData(paymentMethod: string): any {
    return {
      firstName: this.addPaymentForm.get('firstName')?.value,
      middleName: this.addPaymentForm.get('middleName')?.value,
      lastName: this.addPaymentForm.get('lastName')?.value,
      phoneNumber: this.addPaymentForm.get('phoneNumber')?.value,
      email: this.addPaymentForm.get('email')?.value,
      address: this.addPaymentForm.get('address')?.value,
      country: this.addPaymentForm.get('country')?.value,
      state: this.addPaymentForm.get('state')?.value,
      zipCode: this.addPaymentForm.get('zipCode')?.value,
      paymentMethod: paymentMethod,
      paymentAmount: this.totalPrice,
      paymentRef: (<HTMLInputElement>document.getElementById("receivedBy")).value,
    }
  }
  payByCard(): void {
    const paymentData = this.getPaymentData('card');
    this.makePayment(paymentData)
  }

  payByCash(): void {
    const paymentData = this.getPaymentData('cash')
    this.makePayment(paymentData)
  }

  makePayment(paymentData: any): void {
    console.log('paymentData', paymentData);
    this.paymentService.addPaymentFromAdmin(paymentData, this.booking_id).subscribe({
      next: (response: any) => {
        this.openSnackBar(response.message, 'Close');
        this.resetForm();
        this.router.navigate(['/', 'dashboard', 'list-booking']);
      },
      error: (err: any) => {
        this.openSnackBar(err.error.message, 'Close');
        console.log(err);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  resetForm(): void {
    this.addPaymentForm.reset();
    this.cardInfoForm.reset();
  }

}
