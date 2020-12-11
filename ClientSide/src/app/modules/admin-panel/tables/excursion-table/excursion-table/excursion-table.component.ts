import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/data/models/article';
import { Excursion } from 'src/app/data/models/excursion';
import { AddExcursionComponent } from '../../../forms/add-excursion/add-excursion.component';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-excursion-table',
  templateUrl: './excursion-table.component.html',
  styleUrls: ['./excursion-table.component.scss']
})
export class ExcursionTableComponent implements OnInit {

  excursions: Excursion[];

  displayedColumns: string[] = ['id', 'name', 'price', 'count', 'date', 'actions'];

  constructor(private adminService: AdminService,
    public dialog: MatDialog) { }

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
  openDialogCreate(): void {
    this.dialog.open(AddExcursionComponent, {
      width: '750px',
      data: { choser: 1 }
    });
  }

  openDialogUpdate(excursion: Excursion): void {
    this.dialog.open(AddExcursionComponent, {
      width: '750px',
      data: {
        choser: 2,
        id: excursion.id,
        name: excursion.name,
        price: excursion.price,
        numberOfSeats: excursion.numberOfSeats,
        categoryId: excursion.categoryId,
        description: excursion.description,
        image: excursion.image,
        date: excursion.date
      }
    });
  }
}