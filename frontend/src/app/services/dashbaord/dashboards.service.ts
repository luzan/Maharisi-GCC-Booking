import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../booking/BookingInterface';
import { Dashboard } from './DashboardInterface';

@Injectable({
  providedIn: 'root'
})

export class DashboardsService {

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/bookings`);;
  }

  addBook(booking: Booking) {
    console.log("--dashbaord-new--", booking);
    return this.http.post<{ token: string }>(`${environment.apiUrl}/bookings/admin`, booking);
  }
}
