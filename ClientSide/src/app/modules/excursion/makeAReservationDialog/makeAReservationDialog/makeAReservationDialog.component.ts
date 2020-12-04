import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-makeAReservationDialog',
  templateUrl: './makeAReservationDialog.component.html',
  styleUrls: ['./makeAReservationDialog.component.scss']
})
export class MakeAReservationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MakeAReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
export interface DialogData {
  animal: string;
  name: string;
}
