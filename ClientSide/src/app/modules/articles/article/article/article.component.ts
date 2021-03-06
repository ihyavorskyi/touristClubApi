import { CommentService } from './../../services/comment.service';
import { ArticleService } from '../../services/article.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Article } from 'src/app/data/models/article';
import { sendComment } from 'src/app/data/models/sendComment';
import { Comment } from 'src/app/data/models/comment';
import { MySnackBar } from 'src/app/common/snack-bar.service';
import { AddArticleComponent } from 'src/app/modules/admin-panel/forms/add-article/add-article.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/modules/admin-panel/services/admin.service';
import { UploadImageService } from 'src/app/common/upload-image.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article;
  comments: Comment[];
  needPaginator: boolean;

  userId = localStorage.getItem("uId");

  length: number;
  pageSize = 3;
  pageSizeOptions: number[] = [1, 3, 5, 10];

  constructor(private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private snackBar: MySnackBar,
    private adminService: AdminService,
    public dialog: MatDialog,
    private uploadImageService: UploadImageService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.articleService.getArticle(params.id).subscribe(ar => {
          this.article = ar;
          this.areAnyComments();
        });
      }
    });
  }

  delete(id: number) {
    this.adminService.deleteArticle(id).subscribe(value => {
      this.snackBar.showSnackBar('Видалено');
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
    this.uploadImageService.uploadFile(files, id, 'article', 'articles/upload');
  };

  addComment(item) {
    if (item.value != '') {
      const comment: sendComment = {
        id: 0,
        text: item.value,
        authorId: localStorage.getItem("uId"),
        articleId: Number(this.article.id)
      };
      item.value = '';
      this.commentService.addComment(comment).subscribe(value => {
        console.log(value);
        this.refresh();
      });
    }
  }

  deleteComment(id: number) {
    console.log(id);
    this.commentService.deleteComment(id).subscribe(value => {
      console.log(value);
      this.refresh();
      this.snackBar.showSnackBar('Видалено');
    });
  }

  public getLinkPicture(id: number) {
    return `https://localhost:5001/api/articles/image/${id}`;
  }

  public getAuthorLinkPicture(id: string) {
    return `https://localhost:5001/api/account/avatar/${id}`;
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.article.comments.length) {
      endIndex = this.article.comments.length;
    }
    this.comments = this.article.comments.slice(startIndex, endIndex);
  }

  areAnyComments() {
    if (this.article.comments) {
      this.length = this.article.comments.length;
      this.comments = this.article.comments.slice(0, this.pageSize);
      this.needPaginator = true;
    }
  }
}