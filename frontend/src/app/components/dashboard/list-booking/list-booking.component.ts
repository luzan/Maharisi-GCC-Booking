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

  edit(): void { }

  pay(): void { }

  cancel(): void { }

  view(): void { }



  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogDeleteBooking, {
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

export class DialogDeleteBooking {
  constructor(public dialogRef: MatDialogRef<DialogDeleteBooking>) { }
}

