import { NumberOfSeats } from './../../../../data/models/numberOfSeats';
import { Ticket } from './../../../../data/models/ticket';
import { TicketService } from './../../services/ticket.service';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MySnackBar } from 'src/app/common/snack-bar.service';

@Component({
  selector: 'app-makeAReservationDialog',
  templateUrl: './makeAReservationDialog.component.html',
  styleUrls: ['./makeAReservationDialog.component.scss']
})
export class MakeAReservationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MakeAReservationDialogComponent>, private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private snackBar: MySnackBar) {
    data.count = 1;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    const newNumberOfSeats: NumberOfSeats = {
      excursionId: Number(this.data.excursionId),
      numberOfSeats: Number(this.data.numberOfSeats - this.data.count)
    }
    this.ticketService.updateNumberOfSeats(newNumberOfSeats).subscribe(value => {
      this.snackBar.showSnackBar('Заброньовано');
    });
    const ticket: Ticket = {
      id: 0,
      ownerId: localStorage.getItem("uId"),
      excursionId: Number(this.data.excursionId),
      excursion: null
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
  numberOfSeats: number;
}
