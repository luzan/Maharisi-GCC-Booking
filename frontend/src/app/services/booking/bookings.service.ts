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

  // getBookigs() {
  //   return this.http.get<Array<Booking>>('http://localhost:3000/api/v1/book');
  // }

  // getBookigById(book_id: string) {
  //   return this.http.get<Booking>('http://localhost:3000/api/v1/book/' + book_id);
  // }

  // deleteBookigById(book_id: string) {
  //   return this.http.delete('http://localhost:3000/api/v1/book/' + book_id);
  // }

  // addNewBookig(bookig: Booking) {
  //   return this.http.post('http://localhost:3000/api/v1/book', bookig);
  // }

  // updateBookig(bookig: Booking) {
  //   return this.http.put('http://localhost:3000/api/v1/book/' + bookig._id, bookig);

  // }

}
