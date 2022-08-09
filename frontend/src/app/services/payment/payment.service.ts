import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getAllPaymentData(): any {
    return this.http.get(`${environment.apiUrl}/payments`);
  }

  addPaymentFromAdmin(payment: any, booking_id?: string): any {
    return this.http.post(`${environment.apiUrl}/payments/bookings/${booking_id}/admin`, payment);
  }
  addPaymentFromUser(payment: any, booking_id?: string): any {
    return this.http.post(`${environment.apiUrl}/payments/bookings/${booking_id}/user`, payment);
  }
}
