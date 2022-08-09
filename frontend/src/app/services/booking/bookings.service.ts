import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from './BookingInterface';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http: HttpClient) { }

  addBookUser(booking: Booking) {
    return this.http.post<any>(`${environment.apiUrl}/bookings`, booking);
  }

  addBookingAdmin(booking: Booking) {
    console.log("--dashbaord-new--", booking);
    return this.http.post<{ token: string }>(`${environment.apiUrl}/bookings/admin`, booking);
  }

  getAllBookingData(): any {
    return this.http.get<any>(`${environment.apiUrl}/bookings`);
  }

  getAllBookingDataOfUser(userId?: string): any {
    return this.http.get<any>(`${environment.apiUrl}/bookings/users/${userId}`);
  }

  getBookingDataForDashboard(): any {
    return this.http.get<any>(`${environment.apiUrl}/bookings?template=dashboard`);
  }

  getBookingById(booking_id?: string): any {
    return this.http.get<any>(`${environment.apiUrl}/bookings/${booking_id}`);
  }

  updateUserBooking(booking: Booking, booking_id?: string, user_id?: string): any {
    return this.http.put(`${environment.apiUrl}/bookings/${user_id}/${booking_id}`, booking);
  }
  // deleteBookigById(book_id: string) {
  //   return this.http.delete('http://localhost:3000/api/v1/book/' + book_id);
  // }

  // addNewBookig(bookig: Booking) {
  //   return this.http.post('http://localhost:3000/api/v1/book', bookig);
  // }


}
