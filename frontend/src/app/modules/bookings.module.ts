import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AddBookingComponent } from '../components/booking/add-booking.component';
import { EditBookingComponent } from '../components/booking/edit-booking.component';
import { BookingComponent } from '../components/booking/booking.component';



@NgModule({
  declarations: [
    BookingComponent,
    AddBookingComponent,
    EditBookingComponent,
  ],
  imports: [
    CommonModule,
    // todos
    RouterModule.forChild([
      { path: '', component: BookingComponent },
      { path: 'add', component: AddBookingComponent },
      { path: 'edit/:todo_id', component: EditBookingComponent },
    ]),
    ReactiveFormsModule
  ]
})
export class BookingsModule { }
