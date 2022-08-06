import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckTokenGuard } from './services/check-token.guard';

const DashboardModules = import('./modules/dashboard.module');

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddBookingComponent } from './components/booking/add-booking.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent
    // loadChildren: () => DashboardModules.then(module => module.DashboardModule),
    // canActivate: [CheckTokenGuard]
  },
  { path: 'add-booking', component: AddBookingComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 