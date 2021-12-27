import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
// import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { SettingComponent } from './chart/setting/setting.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SettingsService } from '../services/settings.service';

const modules = [
  CommonModule,
  EmployeeRoutingModule,
  ReactiveFormsModule,
  FormsModule,
  MatRadioModule,
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatCardModule,
  MatNativeDateModule,
  MatIconModule,
  MatToolbarModule,
  MatDialogModule,
  MatCheckboxModule, // NgChartsModule,
];

@NgModule({
  declarations: [ListComponent, AddComponent, ChartComponent, SettingComponent],
  imports: modules,
  providers: [],
})
export class EmployeeModule {}
