
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { UserService } from '../../../services/user/user.service';
import { RoomService } from 'src/app/services/room/room.service';
export interface PeriodicElement {
  position: number;
  building: string;
  roomNumber: string;
  isAccessible: string;
  floor: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, building: 'Hydrogen', roomNumber: 'H', isAccessible: 'H', floor: 'H', action:''},
  {position: 2, building: 'Helium', roomNumber: 'H', isAccessible: 'H', floor: 'H', action:''},
  {position: 3, building: 'Lithium', roomNumber: 'H', isAccessible: 'H', floor: 'H', action:''},
  {position: 4, building: 'Beryllium', roomNumber: 'H', isAccessible: 'H', floor: 'H', action:''},
  {position: 5, building: 'Boron', roomNumber: 'H', isAccessible: 'H', floor: 'H', action:''},
  {position: 6, building: 'Carbon', roomNumber: 'H', isAccessible: 'H', floor: 'H', action:''},
  {position: 7, building: 'Nitrogen', roomNumber: 'H', isAccessible: 'H', floor: 'H', action:''},
  {position: 8, building: 'Oxygen', roomNumber: 'H', isAccessible: 'H', floor: 'H', action:''},
  {position: 9, building: 'Fluorine', roomNumber: 'H', isAccessible: 'H', floor: 'H', action:''},
  {position: 10, building: 'Neon', roomNumber: 'H', isAccessible: 'H', floor: 'H', action:''},
];

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['../dashboard.component.css']
})
export class RoomComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'building', 'roomNumber', 'isAccessible', 'floor', 'action'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource();
  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private router: Router, 
    private _liveAnnouncer: LiveAnnouncer) { 

  }
  
  @ViewChild(MatSort) sort!: MatSort;  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllRoomData(): void {
    this.roomService.getAllRooms().subscribe({
      next: (response: any) => {
        // console.log("--response.data--", response.data)
        this.dataSource.data = this.roomDataParser(response.data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  roomDataParser(data: any[]): any[] {
    return data.map((room: any, index) => {
      return {
        position: ++index,
        room_id: room._id,
        building: room.building,
        roomNumber: room.roomNumber,
        isAccessible: room.isAccessible,
        floor: room.floor,
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
    this.getAllRoomData();
  }

  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  edit(room_id: string): void {
    this.router.navigate(['/', 'dashboard', 'edit-room', room_id]);
  }

  disable(room_id: string): void{
    console.log("--room_id--", room_id)
  }

  view(): void{}

}
