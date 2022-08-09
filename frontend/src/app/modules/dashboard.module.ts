import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';

import { PaymentComponent } from '../components/dashboard/payment/payment.component';
import { MakePaymentComponent } from '../components/dashboard/payment/make-payment/make-payment.component';
import { RoomComponent } from '../components/dashboard/room/room.component';
import { AddRoomComponent } from '../components/dashboard/room/add-room/add-room.component';
import { EditRoomComponent } from '../components/dashboard/room/edit-room/edit-room.component';
import { ViewRoomComponent } from '../components/dashboard/room/view-room/view-room.component';

import { UserComponent } from '../components/dashboard/user/user.component';
import { ListBookingComponent } from '../components/dashboard/list-booking/list-booking.component';
import { AddUserComponent } from '../components/dashboard/user/add-user/add-user.component';
import { EditUserComponent } from '../components/dashboard/user/edit-user/edit-user.component';
import { EditBookingAdminComponent } from '../components/dashboard/edit-booking-admin/edit-booking-admin.component';
import { ViewBookingAdminComponent } from '../components/dashboard/view-booking-admin/view-booking-admin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ListBookingComponent,
    EditBookingAdminComponent,
    PaymentComponent,
    RoomComponent,
    AddRoomComponent,
    EditRoomComponent,
    ViewRoomComponent,
    UserComponent,
    MakePaymentComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
      { path: 'list-booking', component: ListBookingComponent },
      { path: 'edit-booking/:booking_id', component: EditBookingAdminComponent },
      { path: 'view-booking-admin', component: ViewBookingAdminComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'make-payment/:booking_id', component: MakePaymentComponent },
      { path: 'room', component: RoomComponent },
      { path: 'view-room', component: ViewRoomComponent },
      { path: 'add-room', component: AddRoomComponent },
      { path: 'edit-room/:room_id', component: EditRoomComponent },
      { path: 'user', component: UserComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:user_id', component: EditUserComponent },
    ]),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
