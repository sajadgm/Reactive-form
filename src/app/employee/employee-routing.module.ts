import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
      path: '',children: [
        { path: 'list', component: ListComponent },
        { path: 'chart', component: ChartComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[FormBuilder]
})
export class EmployeeRoutingModule { }
