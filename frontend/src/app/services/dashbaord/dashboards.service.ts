import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dashboard } from './DashboardInterface';

@Injectable({
  providedIn: 'root'
})

export class DashboardsService {

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/bookings`);;
  }

  addBook(dashbaord: Dashboard) {
    console.log("--dashbaord-new--", dashbaord);
    return this.http.post<{ token: string }>(`${environment.apiUrl}/bookings`, dashbaord);
  }

  // addBooks(body: {}) {
  // firstName: new FormControl(),
  // middleName: new FormControl(), 
  // lastName: new FormControl(), 
  // phoneNumber: new FormControl(),
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

  //   return this.http.post<{ token: string }>(`${environment.apiUrl}/bookings`, { 
  //     body: body
  //   });
  // }
}