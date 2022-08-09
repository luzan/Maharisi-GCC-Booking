import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { UserService } from '../../../services/user/user.service';
import { BookingsService } from 'src/app/services/booking/bookings.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['../booking.component.css']
})


export class BookingHistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'checkInDate', 'checkOutDate', 'room', 'purpose', 'paymentStatus', 'action'];
  dataSource = new MatTableDataSource();
  constructor(public dialog: MatDialog,
    private userService: UserService,
    private bookingService: BookingsService,
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
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  ngOnInit(): void {
    const userState = this.userService.getUserState()
    this.getAllBookingDataOfUser(userState?.user_id);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  getAllBookingDataOfUser(userId?: string): void {

    this.bookingService.getAllBookingDataOfUser(userId).subscribe({
      next: (response: any) => {
        this.dataSource.data = this.bookingDataParser(response.data);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  bookingDataParser(data: any[]): any[] {
    return data.map((booking: any, index) => {
      return {
        position: ++index,
        booking_id: booking._id,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        purpose: booking.purposeOfStay,
        room: `${booking.room.building} RM#${booking.room.roomNumber}`,
        paymentStatus: `$${booking.cost.totalPrice} \n (${booking.paymentStatus})`,
        amount: booking.cost.totalPrice,
        action: ''
      };
    });
  }

  edit(booking_id: string): void {
    this.router.navigate(['/', 'booking', 'edit', booking_id]);
  }

  pay(booking_id: string): void {
    this.router.navigate(['/', 'booking', 'make-payment', booking_id]);
  }

  cancel(): void { }

  view(): void { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogDeleteBookingHistory, {
      width: '500px',
      height: '200px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html'
})

export class DialogDeleteBookingHistory {
  constructor(public dialogRef: MatDialogRef<DialogDeleteBookingHistory>) { }
}