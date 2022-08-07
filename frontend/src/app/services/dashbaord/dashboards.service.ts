import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from './DashboardInterface';

@Injectable({
  providedIn: 'root'
})

export class DashboardsService {

  constructor(private http: HttpClient) { }

  baseUrl="http://localhost:3000/api/v1";

  getAllBookings():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/bookings`);;
  }

  addBook(dashbaord: Dashboard) {
    console.log("--dashbaord--", dashbaord);
    return this.http.post<{ token: string }>(`${this.baseUrl}/bookings`, dashbaord);
  }

  // addBooks(body: {}) {
    // firstName: new FormControl(),
    // middleName: new FormControl(), 
    // lastName: new FormControl(), 
    // phone: new FormControl(),
    // email: new FormControl(), 

    // staff: new FormControl(), 
    // student: new FormControl(),
    // guest: new FormControl(), 

    // checkOutDate: new FormControl(),
    // checkInDate: new FormControl(),
    // purposeOfStay: new FormControl(),
    // accessibleRequired: new FormControl(),
    // discountOf: new FormControl(),
    // occcupants: new FormControl(),
    // paidInCash: new FormControl()
  //   console.log("--body--", body);

  //   return this.http.post<{ token: string }>(`${this.baseUrl}/bookings`, { 
  //     body: body
  //   });
  // }
}
