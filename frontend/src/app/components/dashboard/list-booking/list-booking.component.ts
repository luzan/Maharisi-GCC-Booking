import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import { UserService } from '../../../services/user/user.service';
export interface PeriodicElement {
  position: number;
  name: string;
  checkInDate: string;
  checkOutDate: string;
  purpose: string;
  room: number;
  amount: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', checkInDate: 'H', checkOutDate: 'H', purpose: 'H', room: 1, amount: 'H', action: '' },
  { position: 2, name: 'Helium', checkInDate: 'H', checkOutDate: 'H', purpose: 'H', room: 1, amount: 'H', action: '' },
  { position: 3, name: 'Lithium', checkInDate: 'H', checkOutDate: 'H', purpose: 'H', room: 1, amount: 'H', action: '' },
  { position: 4, name: 'Beryllium', checkInDate: 'H', checkOutDate: 'H', purpose: 'H', room: 1, amount: 'H', action: '' },
  { position: 5, name: 'Boron', checkInDate: 'H', checkOutDate: 'H', purpose: 'H', room: 1, amount: 'H', action: '' },
  { position: 6, name: 'Carbon', checkInDate: 'H', checkOutDate: 'H', purpose: 'H', room: 1, amount: 'H', action: '' },
  { position: 7, name: 'Nitrogen', checkInDate: 'H', checkOutDate: 'H', purpose: 'H', room: 1, amount: 'H', action: '' },
  { position: 8, name: 'Oxygen', checkInDate: 'H', checkOutDate: 'H', purpose: 'H', room: 1, amount: 'H', action: '' },
  { position: 9, name: 'Fluorine', checkInDate: 'H', checkOutDate: 'H', purpose: 'H', room: 1, amount: 'H', action: '' },
  { position: 10, name: 'Neon', checkInDate: 'H', checkOutDate: 'H', purpose: 'H', room: 1, amount: 'H', action: '' },
];
@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['../dashboard.component.css']
})

export class ListBookingComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'checkInDate', 'checkOutDate', 'purpose', 'room', 'amount', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(
    public dialog: MatDialog, 
    private userService: UserService, 
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
  }

  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  edit(): void{}

  pay(): void{}

  cancel(): void{}

  view(): void{}



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
  constructor(public dialogRef: MatDialogRef<DialogDeleteBooking>) {}
}

