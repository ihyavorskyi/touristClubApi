import { Component, OnInit } from '@angular/core';
import { Excursion } from 'src/app/data/models/excursion';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-excursion-table',
  templateUrl: './excursion-table.component.html',
  styleUrls: ['./excursion-table.component.scss']
})
export class ExcursionTableComponent implements OnInit {

  excursions: Excursion[];

  displayedColumns: string[] = ['id', 'name','price','count', 'date', 'actions'];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getExcursions().subscribe(value => {
      this.excursions = value;
      console.log("Excursion -> ");
      console.log(this.excursions);
    });
  }

  delete(id: number) {
    this.adminService.deleteExcursion(id).subscribe(value => {
      console.log(value);
    });
  }
}
