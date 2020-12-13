import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { ShortArticle } from 'src/app/data/models/shortArticle';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  articles: ShortArticle[];
  articlesClone: ShortArticle[];

  constructor(private articleService: ArticleService, private router: Router) {
    this.articleService.getArticles().subscribe(value => {
      this.articles = value;
      this.articlesClone = value;
      this.articles.reverse();
    });
  }

  ngOnInit() {
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