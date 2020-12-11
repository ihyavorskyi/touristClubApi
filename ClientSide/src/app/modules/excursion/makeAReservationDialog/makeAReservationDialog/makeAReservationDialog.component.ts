import { Ticket } from './../../../../data/models/ticket';
import { TicketService } from './../../services/ticket.service';
import { Inject, NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-makeAReservationDialog',
  templateUrl: './makeAReservationDialog.component.html',
  styleUrls: ['./makeAReservationDialog.component.scss']
})
export class MakeAReservationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MakeAReservationDialogComponent>, private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { data.count = 1;}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick() {
    const ticket: Ticket = {
      id: 0,
      ownerId: localStorage.getItem("uId"),
      excursionId: Number(this.data.excursionId)
    };
    for (let i = 0; i < this.data.count; i++) {
      this.ticketService.addTicket(ticket).subscribe(value => {
        console.log(value);
      });
    }
    this.dialogRef.close();
  }
}
export interface DialogData {
  excursionId: number;
  count: number;
}
