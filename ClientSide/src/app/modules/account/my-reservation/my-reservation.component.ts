import { Ticket } from './../../../data/models/ticket';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/data/models/user';
import { RecordService } from '../../department-functionality/services/record.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {

  user: User;
  displayedColumns: string[] = ['doctor', 'patient', 'dateOfMeeting', 'dateOfRecord', 'service', 'delete'];
  displayedColumns2: string[] = ['doctor', 'patient', 'dateOfMeeting', 'dateOfRecord', 'service', 'empty'];

  tickets: Ticket[];

  constructor(private accountService: AccountService, private recordService: RecordService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const uId = localStorage.getItem('uId');
    console.log(uId);
    
    this.accountService.getTickets(uId).subscribe(value => {
      this.tickets = value;
      console.log(this.tickets);
    });
  }

  deleteRecord(id: number): void {
    /*    this.recordService.deleteRecord(id).subscribe(value => {
         if (value) {
           this.records = this.records.filter(rec => rec.id !== id);
           this.snackBar.open('Запис відмінено', 'Подякував', {
             duration: 3000,
             horizontalPosition: 'center',
             verticalPosition: 'bottom',
             panelClass: ['my-snack'],
             politeness: 'assertive'
           });
         }
       }); */
  }

  isDateExpired(dateStr: any): boolean {
    const date = new Date(dateStr);
    const nowDate = new Date();
    if (date < nowDate) {
      return true;
    }
    return false;
  }
}
