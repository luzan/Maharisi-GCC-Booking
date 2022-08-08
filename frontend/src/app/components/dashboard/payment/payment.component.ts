
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { UserService } from '../../../services/user/user.service';
export interface PeriodicElement {
  position: number;
  name: string;
  paymentDate: string;
  forBooking: string;
  method: string;
  status: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', paymentDate: 'H', forBooking: 'H', method: 'H', status: 'H', 'action':''},
  {position: 2, name: 'Helium', paymentDate: 'H', forBooking: 'H', method: 'H', status: 'H', 'action':''},
  {position: 3, name: 'Lithium', paymentDate: 'H', forBooking: 'H', method: 'H', status: 'H', 'action':''},
  {position: 4, name: 'Beryllium', paymentDate: 'H', forBooking: 'H', method: 'H', status: 'H', 'action':''},
  {position: 5, name: 'Boron', paymentDate: 'H', forBooking: 'H', method: 'H', status: 'H', 'action':''},
  {position: 6, name: 'Carbon', paymentDate: 'H', forBooking: 'H', method: 'H', status: 'H', 'action':''},
  {position: 7, name: 'Nitrogen', paymentDate: 'H', forBooking: 'H', method: 'H', status: 'H', 'action':''},
  {position: 8, name: 'Oxygen', paymentDate: 'H', forBooking: 'H', method: 'H', status: 'H', 'action':''},
  {position: 9, name: 'Fluorine', paymentDate: 'H', forBooking: 'H', method: 'H', status: 'H', 'action':''},
  {position: 10, name: 'Neon', paymentDate: 'H', forBooking: 'H', method: 'H', status: 'H', 'action':''},
];
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['../dashboard.component.css']
})

export class PaymentComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'paymentDate', 'forBooking', 'method', 'status', 'action'];
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

  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  refund(): void{}

}