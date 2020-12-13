import { AdminService } from './../../../admin-panel/services/admin.service';
import { Excursion } from './../../../../data/models/excursion';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MakeAReservationDialogComponent } from '../../makeAReservationDialog/makeAReservationDialog/makeAReservationDialog.component';
import { ActivatedRoute } from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-excursion',
  templateUrl: './excursion.component.html',
  styleUrls: ['./excursion.component.scss']
})
export class ExcursionComponent implements OnInit {

  excursion: Excursion;
  excursionId: number;

  haveSeats = true;

  constructor(public dialog: MatDialog, private adminService: AdminService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.route.params.subscribe(params => {
      if (params.id) {
        this.excursionId = params.id;
        this.adminService.getExcursion(this.excursionId).subscribe(ex => {
          this.excursion = ex;
          if (this.excursion.numberOfSeats <= 0) {
            this.haveSeats = false;
          }
          console.log(this.excursion);
        });
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MakeAReservationDialogComponent, {
      width: '250px',
      data: { excursionId: this.excursionId, numberOfSeats: this.excursion.numberOfSeats }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }
}