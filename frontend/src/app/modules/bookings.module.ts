import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { EditBookingComponent } from '../components/booking/edit-booking/edit-booking.component';
import { BookingComponent } from '../components/booking/booking.component';
import { MaterialModule } from '../material/material.module';
import { PaymentGuestComponent } from '../components/booking/payment-guest/payment-guest.component';
import { BookingHistoryComponent } from '../components/booking/booking-history/booking-history.component';

@NgModule({
  declarations: [
    BookingComponent,
    BookingHistoryComponent,
    EditBookingComponent,
    PaymentGuestComponent
  ],
  imports: [
    CommonModule,
    // todos
    RouterModule.forChild([
      { path: '', component: BookingComponent },
      { path: 'make-payment-guest', component: PaymentGuestComponent },
      { path: 'book-history', component: BookingHistoryComponent },
    ]),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class BookingsModule { }
