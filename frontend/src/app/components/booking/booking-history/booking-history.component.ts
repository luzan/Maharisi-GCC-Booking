import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from '../../../services/user/user.service';
export interface PeriodicElement {
  position: number;
  checkInDate: string;
  checkOutDate: string;
  bookingHistory: string;
  paymentStatus: string;
  action:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, checkInDate: 'H', checkOutDate: 'H', bookingHistory: 'H', paymentStatus:"H", action:''},
  {position: 2, checkInDate: 'H', checkOutDate: 'H', bookingHistory: 'H', paymentStatus:"H", action:''},
  {position: 3, checkInDate: 'H', checkOutDate: 'H', bookingHistory: 'H', paymentStatus:"H", action:''},
  {position: 4, checkInDate: 'H', checkOutDate: 'H', bookingHistory: 'H', paymentStatus:"H", action:''},
  {position: 5, checkInDate: 'H', checkOutDate: 'H', bookingHistory: 'H', paymentStatus:"H", action:''},
  {position: 6, checkInDate: 'H', checkOutDate: 'H', bookingHistory: 'H', paymentStatus:"H", action:''},
  {position: 7, checkInDate: 'H', checkOutDate: 'H', bookingHistory: 'H', paymentStatus:"H", action:''},
  {position: 8, checkInDate: 'H', checkOutDate: 'H', bookingHistory: 'H', paymentStatus:"H", action:''},
  {position: 9, checkInDate: 'H', checkOutDate: 'H', bookingHistory: 'H', paymentStatus:"H", action:''},
  {position: 10, checkInDate: 'H', checkOutDate: 'H', bookingHistory: 'H', paymentStatus:"H", action:''},];

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['../booking.component.css']
})

export class BookingHistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'checkInDate', 'checkOutDate', 'bookingHistory', 'paymentStatus', 'action' ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private userService: UserService, private router: Router, private _liveAnnouncer: LiveAnnouncer) { }

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
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  edit(): void { }

  pay(): void { }

  cancel(): void { }

  view(): void { }

}
