import { Ticket } from './../../../data/models/ticket';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { NumberOfSeats } from 'src/app/data/models/numberOfSeats';
import { TicketService } from '../../excursion/services/ticket.service';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {
  displayedColumns: string[] = ['dateOfIssuance', 'uniqueCode', 'name', 'date', 'delete'];
  tickets: Ticket[];

  constructor(private accountService: AccountService, private ticketService: TicketService,
    private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    const uId = localStorage.getItem('uId');
    console.log(uId);

    this.accountService.getTickets(uId).subscribe(value => {
      this.tickets = value;
      console.log(this.tickets);
    });
  }

  deleteTicket(ticket: Ticket): void {
    this.accountService.deleteTicket(ticket.id).subscribe(value => {
      if (value) {
        const newNumberOfSeats: NumberOfSeats = {
          excursionId: Number(ticket.excursion.id),
          numberOfSeats: Number(ticket.excursion.numberOfSeats - 1)
        }
        console.log(ticket.excursion.numberOfSeats);
        this.ticketService.updateNumberOfSeats(newNumberOfSeats).subscribe(value => {
          this.refresh();
          this.showSnackBar('Бронь відмінено');
        });
      }
    });
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

  goToExcursion(id: number) {
    this.router.navigateByUrl(`/excursion/${id}`);
  }
}
