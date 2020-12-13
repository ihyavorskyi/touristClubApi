import { MySnackBar } from 'src/app/common/snack-bar.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Excursion } from 'src/app/data/models/excursion';
import { AddExcursionComponent } from '../../../forms/add-excursion/add-excursion.component';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-excursion-table',
  templateUrl: './excursion-table.component.html',
  styleUrls: ['./excursion-table.component.scss']
})
export class ExcursionTableComponent implements OnInit {
  public progress: number;
  public message: string;
  isVisible: boolean;
  isLoading: boolean;
  @Output() uploadFinished = new EventEmitter();

  excursions: Excursion[];

  displayedColumns: string[] = ['id', 'name', 'price', 'count', 'date', 'upload', 'actions'];

  constructor(private adminService: AdminService,
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MySnackBar,
    private changeDetectorRefs: ChangeDetectorRef) {
    this.isVisible = false;
    this.isLoading = false;
  }

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
    if (files.length === 0) {
      return;
    }
    console.log(id);
    this.isLoading = true;
    const fileToUpload = files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('excursion', id.toString());
    this.http.post('https://localhost:5001/api/excursions/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('uploaded');
          this.uploadFinished.emit(event.body);
          this.isVisible = true;
          this.isLoading = false;
          setTimeout(() => {
            this.isVisible = false;
          }, 3000);
        }
      });
    this.snackBar.showSnackBar('Зображення оновлено');
  };
}