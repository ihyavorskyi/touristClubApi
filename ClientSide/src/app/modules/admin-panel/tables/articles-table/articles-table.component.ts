import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MySnackBar } from 'src/app/common/snack-bar.service';
import { Article } from 'src/app/data/models/article';
import { AddArticleComponent } from '../../forms/add-article/add-article.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss']
})
export class ArticlesTableComponent implements OnInit {
  public progress: number;
  public message: string;
  isVisible: boolean;
  isLoading: boolean;
  @Output() uploadFinished = new EventEmitter();

  articles: Article[];

  displayedColumns: string[] = ['id', 'name', 'description', 'date', 'upload', 'actions'];

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
    this.adminService.getArticles().subscribe(value => {
      this.articles = value;
      this.changeDetectorRefs.detectChanges();
    });
  }

  delete(id: number) {
    this.adminService.deleteArticle(id).subscribe(value => {
      this.articles = this.articles.filter(rec => rec.id !== id);
      this.snackBar.showSnackBar('Видалено');
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AddArticleComponent, {
      width: '750px',
      data: { choser: 1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.snackBar.showSnackBar('Ствoрено');
    });
  }

  openDialogUpdate(article: Article): void {
    const dialogRef = this.dialog.open(AddArticleComponent, {
      width: '750px',
      data: {
        choser: 2,
        id: article.id,
        title: article.title,
        text: article.text,
        description: article.description,
        image: article.image,
        topicId: article.topicId
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
    formData.append('article', id.toString());
    this.http.post('https://localhost:5001/api/articles/upload', formData, { reportProgress: true, observe: 'events' })
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