import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { AddDashboardComponent } from '../components/dashboard/add-dashboard/add-dashboard.component';
import { EditDashboardComponent } from '../components/dashboard/edit-dashboard/edit-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddDashboardComponent,
    EditDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
      { path: 'add', component: DashboardComponent },
      { path: 'edit', component: DashboardComponent },
      { path: 'list', component: DashboardComponent },
    ]),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
