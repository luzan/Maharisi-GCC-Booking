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
import { RouterModule } from '@angular/router';
import { BookingsModule } from './modules/bookings.module';
import { DashboardModule } from './modules/dashboard.module';
import { ListBookingComponent } from './components/booking/list-booking/list-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ListBookingComponent
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
    BrowserAnimationsModule,
    BookingsModule,
    DashboardModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true }],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
