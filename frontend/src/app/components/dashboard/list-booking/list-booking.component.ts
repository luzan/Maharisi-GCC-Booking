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
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['../dashboard.component.css']
})

export class ListBookingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'checkInDate', 'checkOutDate', 'purpose', 'room', 'amount', 'action'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
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

  getAllBookingData(): void {
    this.bookingService.getAllBookingData().subscribe({
      next: (response: any) => {
        this.dataSource.data = this.bookingDataParser(response.data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  bookingDataParser(data: any[]): any[] {
    return data.map((booking: any, index) => {
      return {
        position: ++index,
        booking_id: booking._id,
        name: booking.user.firstName + ' ' + booking.user.lastName,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        purpose: booking.purposeOfStay,
        room: booking.room.roomNumber,
        amount: booking.cost.totalPrice,
        action: ''
      };
    });
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
    this.getAllBookingData();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  edit(booking_id: string): void {
    this.router.navigate(['/', 'dashboard', 'edit-booking', booking_id]);
  }

  pay(booking_id: string): void {
    this.router.navigate(['/', 'dashboard', 'make-payment', booking_id]);
  }

  cancel(user_id: string): void {
    console.log("--user_id--", user_id)
    this.bookingService.deleteBookingById(user_id).subscribe({
      next: (response: any) => {
        // console.log("--response.data--", response.data)
        this.getAllBookingData();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  view(): void { }



  openDialog(booking_id: string): void {
    const dialogRef = this.dialog.open(DialogDeleteBooking, {
      width: '250px',
      height: '200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("--result--", result)
      if( result == "delete"){
        this.cancel(booking_id);
      }
    });
  }

}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html'
})

export class DialogDeleteBooking {
  listBookAction = "delete";
  constructor(public dialogRef: MatDialogRef<DialogDeleteBooking>) { }

  onNoClick(): void {
    this.listBookAction = "no-delete"
    this.dialogRef.close(this.listBookAction);
  }
}

