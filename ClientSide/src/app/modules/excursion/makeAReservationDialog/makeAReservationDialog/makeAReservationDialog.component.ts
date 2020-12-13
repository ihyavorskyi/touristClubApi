import { NumberOfSeats } from './../../../../data/models/numberOfSeats';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private snackBar: MatSnackBar) { data.count = 1; }

  ngOnInit() {
  }


  showSnackBar(messadge: string) {
    this.snackBar.open(messadge, 'Подякував', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['my-snack'],
      politeness: 'assertive'
    });
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
      this.showSnackBar('Заброньовано');
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
