import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DepartmentComponent} from './department/department.component';
import {DepartmentsListComponent} from './departments-list/departments-list.component';
import { AddRecordFormComponent } from './forms/add-record-form/add-record-form.component';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [DepartmentComponent, DepartmentsListComponent, AddRecordFormComponent],
  imports: [
    CommonModule, MaterialModule, MatButtonModule, ReactiveFormsModule
  ]
})
export class DepartmentModule {
}