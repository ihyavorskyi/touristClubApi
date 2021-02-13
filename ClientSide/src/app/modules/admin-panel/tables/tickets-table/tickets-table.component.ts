import { Ticket } from './../../../../data/models/ticket';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MySnackBar } from 'src/app/common/snack-bar.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.scss']
})
export class TicketsTableComponent implements OnInit {

  title = "Користувацькі броні";
  name: string;

  tickets: Ticket[];

  displayedColumns: string[] = ['id', 'name', 'excursion', 'actions'];

  constructor(private adminService: AdminService,
    private snackBar: MySnackBar,
    private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.adminService.getTickets().subscribe(value => {
      this.tickets = value;
      console.log(value);
    });
  }

  delete(id: number) {
    this.adminService.deleteTicket(id).subscribe(value => {
      this.tickets = this.tickets.filter(rec => rec.id !== id);
      this.snackBar.showSnackBar('Видалено');
    });
  }
}
