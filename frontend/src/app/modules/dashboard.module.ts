import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../components/dashboard/dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent  },
      { path: 'add', component: DashboardComponent  },
      { path: 'edit', component: DashboardComponent  },
    ]),
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
