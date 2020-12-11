import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    public dialog: MatDialog,private http: HttpClient) { 
      this.isVisible = false;
      this.isLoading = false;
    }

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
  };
}