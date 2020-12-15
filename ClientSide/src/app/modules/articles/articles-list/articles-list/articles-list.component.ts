import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { ShortArticle } from 'src/app/data/models/shortArticle';
import { HeaderComponent } from 'src/app/modules/navigation/header/header.component';
import { MySnackBar } from 'src/app/common/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { AddArticleComponent } from 'src/app/modules/admin-panel/forms/add-article/add-article.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  articles: ShortArticle[];
  articlesClone: ShortArticle[];

  isJournalist = false;

  constructor(private articleService: ArticleService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MySnackBar
  ) {

  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.articleService.getArticles().subscribe(value => {
      this.articles = value;
      this.articlesClone = value;
      this.articles.reverse();
    });
    if (HeaderComponent.isJournalist) {
      this.isJournalist = true;
      console.log("Journalist");
    }
  }

  writeArticle() {
    const dialogRef = this.dialog.open(AddArticleComponent, {
      width: '750px',
      data: { choser: 1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.snackBar.showSnackBar('Ствoрено');
    });
  }

  filterTopic(id: number) {
    if (this.articles.length == this.articlesClone.length) {
      this.articles = this.articles.filter(rec => rec.topic.id == id);
    } else {
      this.articles = this.articlesClone;
    }
  }

  goToArticle(id: number): void {
    console.log("goToArticle/" + id);
    this.router.navigateByUrl(`/article/${id}`);
  }

  public getLinkPicture(id: number) {
    return `https://localhost:5001/api/articles/image/${id}`;
  }
}