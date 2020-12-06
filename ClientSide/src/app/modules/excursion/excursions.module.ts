import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ExcursionComponent } from './excursion/excursion/excursion.component';
import { MakeAReservationDialogComponent } from './makeAReservationDialog/makeAReservationDialog/makeAReservationDialog.component';
import { ExursionsComponent } from './exursions/exursions.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    ExcursionComponent,
    ExursionsComponent,
    MakeAReservationDialogComponent
  ]
})
export class ExcursionsModule { }
