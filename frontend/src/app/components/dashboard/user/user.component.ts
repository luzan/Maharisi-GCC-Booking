
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
  email: string;
  phone: string;
  room: number;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', email: 'H', phone: 'H',room:1, action: ''},
  {position: 2, name: 'Helium', email: 'H', phone: 'H',room:1, action: ''},
  {position: 3, name: 'Lithium', email: 'H', phone: 'H',room:1, action: ''},
  {position: 4, name: 'Beryllium', email: 'H', phone: 'H',room:1, action: ''},
  {position: 5, name: 'Boron', email: 'H', phone: 'H',room:1, action: ''},
  {position: 6, name: 'Carbon', email: 'H', phone: 'H',room:1, action: ''},
  {position: 7, name: 'Nitrogen', email: 'H', phone: 'H',room:1, action: ''},
  {position: 8, name: 'Oxygen', email: 'H', phone: 'H',room:1, action: ''},
  {position: 9, name: 'Fluorine', email: 'H', phone: 'H',room:1, action: ''},
  {position: 10, name: 'Neon', email: 'H', phone: 'H',room:1, action: ''},
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../dashboard.component.css']
})
export class UserComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'email', 'phone', 'room', 'action'];
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

  edit(): void{}

  pay(): void{}

  cancel(): void{}

  view(): void{}

}
