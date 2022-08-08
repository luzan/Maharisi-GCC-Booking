import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { AddDashboardComponent } from '../components/dashboard/add-dashboard/add-dashboard.component';
import { EditDashboardComponent } from '../components/dashboard/edit-dashboard/edit-dashboard.component';

import { PaymentComponent } from '../components/dashboard/payment/payment.component';
import { RoomComponent } from '../components/dashboard/room/room.component';
import { UserComponent } from '../components/dashboard/user/user.component';
import { ListBookingComponent } from '../components/dashboard/list-booking/list-booking.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddDashboardComponent,
    EditDashboardComponent,
    ListBookingComponent,
    PaymentComponent,
    RoomComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
      { path: 'list-booking', component: ListBookingComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'room', component: RoomComponent },
      { path: 'user', component: UserComponent },
    ]),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
