import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from '../../../../services/user/user.service';
import { PaymentService } from '../../../../services/payment/payment.service';

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['../../booking.component.css']
})
export class ListPaymentsComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'paymentDate', 'forBooking', 'paymentOf', 'method', 'status', 'action'];
  dataSource = new MatTableDataSource();
  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.getAllPaymentData();
  }

  getAllPaymentData(): void {
    this.paymentService.getAllPaymentData().subscribe({
      next: (response: any) => {
        this.dataSource.data = this.paymentDataParser(response.data);
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  paymentDataParser(data: any[]): any[] {
    return data.map((payment: any, index) => {
      return {
        position: ++index,
        payment_id: payment._id,
        name: (payment.user) ? payment.user.firstName + ' ' + payment.user.lastName : ' ',
        paymentDate: payment.paymentDate,
        forBooking: payment.booking_id,
        paymentOf: payment.paymentAmount,
        method: payment.paymentMethod,
        status: payment.status,
        action: ''
      };
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  refund(): void { }

}
