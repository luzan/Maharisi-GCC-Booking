import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentState$ = new BehaviorSubject<{ token: string }>({ token: '' });

  constructor(private http: HttpClient) { }

  getAllPaymentData(): any {
    return this.http.get(`${environment.apiUrl}/payments`);
  }

  getAllPaymentDataForUser(user_id?: string): any {
    return this.http.get(`${environment.apiUrl}/payments/users/${user_id}`);
  }

  addPaymentFromAdmin(payment: any, booking_id?: string): any {
    return this.http.post(`${environment.apiUrl}/payments/bookings/${booking_id}`, payment);
  }
  addPaymentFromUser(payment: any, booking_id?: string): any {
    return this.http.post(`${environment.apiUrl}/payments/user/bookings/${booking_id}`, payment);
  }
}
