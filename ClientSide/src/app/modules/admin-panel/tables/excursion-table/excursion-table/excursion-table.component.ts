import { MySnackBar } from 'src/app/common/snack-bar.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Excursion } from 'src/app/data/models/excursion';
import { AddExcursionComponent } from '../../../forms/add-excursion/add-excursion.component';
import { AdminService } from '../../../services/admin.service';
import { UploadImageService } from 'src/app/common/upload-image.service';

@Component({
  selector: 'app-excursion-table',
  templateUrl: './excursion-table.component.html',
  styleUrls: ['./excursion-table.component.scss']
})
export class ExcursionTableComponent implements OnInit {

  excursions: Excursion[];

  displayedColumns: string[] = ['id', 'name', 'price', 'count', 'date', 'upload', 'actions'];

  constructor(private adminService: AdminService,
    public dialog: MatDialog,
    private snackBar: MySnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private uploadImageService: UploadImageService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.adminService.getExcursions().subscribe(value => {
      this.excursions = value;
      this.changeDetectorRefs.detectChanges();
    });
  }

  delete(id: number) {
    this.adminService.deleteExcursion(id).subscribe(value => {
      this.excursions = this.excursions.filter(rec => rec.id !== id);
      this.snackBar.showSnackBar('Видалено');
    });
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AddExcursionComponent, {
      width: '750px',
      data: { choser: 1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.snackBar.showSnackBar('Ствoрено');
    });
  }

  openDialogUpdate(excursion: Excursion): void {
    const dialogRef = this.dialog.open(AddExcursionComponent, {
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
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.snackBar.showSnackBar('Оновлено');
    });
  }


  public uploadFile = (files, id) => {
    this.uploadImageService.uploadFile(files, id, 'excursion', 'excursions/upload');
  };
}