import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AttachTokenInterceptor } from './services/attach-token.interceptor';


import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AddBookingComponent } from './components/booking/add-booking/add-booking.component';
import { EditBookingComponent } from './components/booking/edit-booking/edit-booking.component';
import { BookingComponent } from './components/booking/booking.component';
import { EditDashboardComponent } from './components/dashboard/edit-dashboard/edit-dashboard.component';
import { AddDashboardComponent } from './components/dashboard/add-dashboard/add-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    BookingComponent,
    AddBookingComponent,
    EditBookingComponent,
    EditDashboardComponent,
    AddDashboardComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true }],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
