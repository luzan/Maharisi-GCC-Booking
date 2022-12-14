import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { UserService } from '../../../services/user/user.service';

export interface PeriodicElement {
  position: number;
  name: string;
  email: string;
  gender: string;
  phone: string;
  role: number;
  action: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../dashboard.component.css']
})
export class UserComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'email', 'gender', 'phone', 'role', 'action'];
  dataSource = new MatTableDataSource();

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

  getAllUserData(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        // console.log("--response.data--", response.data)
        this.dataSource.data = this.userDataParser(response.data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  userDataParser(data: any[]): any[] {
    return data.map((room: any, index) => {
      return {
        position: ++index,
        user_id: room._id,
        name: room.firstName + ' ' + room.middleName + ' ' + room.lastName,
        // name: room.firstName + ' ' + room.lastName,
        gender: room.gender,
        email: room.email,
        phone: room.phone,
        role: room.role,
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
    this.getAllUserData();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  edit(user_id: string): void {
    this.router.navigate(['/', 'dashboard', 'edit-user', user_id]);
  }

  cancel(user_id: string): void {
    this.userService.deleteUser(user_id).subscribe({
      next: (response: any) => {
        // console.log("--response.data--", response.data)
        this.getAllUserData();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  openDialog(user_id: string): void {
    const dialogRef = this.dialog.open(DialogDeleteUser, {
      width: '250px',
      height: '200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log("--result--", result)
      if( result == "delete"){
        this.cancel(user_id);
      }
    });
  }
}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html'
})

export class DialogDeleteUser {
  userAction = "delete";
  constructor(public dialogRef: MatDialogRef<DialogDeleteUser>) { }

  onNoClick(): void {
    this.userAction = "no-delete"
    this.dialogRef.close(this.userAction);
  }
}
