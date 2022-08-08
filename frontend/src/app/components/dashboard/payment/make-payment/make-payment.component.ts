import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from '../../../../services/user/user.service';

export interface PeriodicElement {
  checkInDate: string;
  checkOutDate: string;
  roomNumber: number;
  paymentStatus: string;
  totalAmount: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { checkInDate: 'H', checkOutDate: 'H', roomNumber: 1, paymentStatus: 'H', totalAmount: 1 },
]

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['../../dashboard.component.css']
})
export class MakePaymentComponent implements OnInit {
  addPaymentForm!: FormGroup;
  displayedColumns: string[] = ['checkInDate', 'checkOutDate', 'roomNumber', 'paymentStatus', 'totalAmount'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer) {

    this.addPaymentForm = this.fb.group({
      receivedBy: new FormControl(),
      expiryDate: new FormControl(),
      cvc: new FormControl(),
      cardNumber: new FormControl(),
      nameOnCard: new FormControl(),
      zipCode: new FormControl(),
      state: new FormControl(),
      country: new FormControl(),
      address: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      lastName: new FormControl(),
      middleName: new FormControl(),
      firstName: new FormControl()
    })
  }

  makePayment(): void { }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {
  }

}
