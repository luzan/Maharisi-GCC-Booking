import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { Dashboard } from '../../services/dashbaord/DashboardInterface';
import { DashboardsService } from '../../services/dashbaord/dashboards.service';
import { GetDashboard } from '../../services/dashbaord/GetDashboardInterface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bookForm!: FormGroup;
  listOfDashboard: GetDashboard[] = [];

  constructor(private fb: FormBuilder, 
              private userService: UserService,
              private dashboardService: DashboardsService,
              private router: Router) {

    this.bookForm = this.fb.group({
      firstName: new FormControl(),
      middleName: new FormControl(), 
      lastName: new FormControl(), 
      phoneNumber: new FormControl(),
      email: new FormControl(), 
      staff: new FormControl(), 
      student: new FormControl(),
      guest: new FormControl(), 
      checkOutDate: new FormControl(),
      checkInDate: new FormControl(),
      purposeOfStay: new FormControl(),
      accessibleRequired: new FormControl(),
      discountOf: new FormControl(),
      occcupants: new FormControl(),
      paidInCash: new FormControl()
    })

    this.dashboardService.getAllBookings().subscribe(
      (response) => {
        console.log("--response--", response.bookings);
        this.listOfDashboard = response.bookings;
      }
    );
  }

  ngOnInit(): void {
  }

  addBook(): void{
    console.log("--this.loginForm.value--", this.bookForm.value);
    const checkInDate = new Date(this.bookForm.value.checkInDate).getTime();
    const checkOutDate = new Date(this.bookForm.value.checkOutDate).getTime();
    const middleName = this.bookForm.value.middleName ? this.bookForm.value.middleName : '';
    const guest = this.bookForm.value.guest ? this.bookForm.value.guest : '';
    const staff = this.bookForm.value.staff ? this.bookForm.value.staff : '';
    const student = this.bookForm.value.student ? this.bookForm.value.student : '';
    const body = {
      firstName: this.bookForm.value.firstName,
      middleName: middleName, 
      lastName: this.bookForm.value.lastName, 
      phoneNumber: this.bookForm.value.phoneNumber,
      email: this.bookForm.value.email, 
      guest: guest, 
      staff: staff,  
      student: student,
      checkOutDate: checkInDate,
      checkInDate: checkOutDate,
      purposeOfStay: this.bookForm.value.purposeOfStay,
      accessibleRequired: this.bookForm.value.accessibleRequired,
      discountOf: this.bookForm.value.discountOf,
      occcupants: this.bookForm.value.occcupants,
      paidInCash: this.bookForm.value.paidInCash
    }
    console.log("---body---", body);

    this.dashboardService.addBook(body)
      .subscribe(
        {
          next: (response)=>{
            this.userService.userState$.next(response);
            this.userService.persistState();
            this.router.navigate(['/', 'dashboard']);
          },
          error:(err)=>{
            // this.registration_faileds = true;
            console.log(err);
          }
        }
      );
  }

  logout(): void{
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  getAllBookings(): void{

  }

}
