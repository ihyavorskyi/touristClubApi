import { Router } from '@angular/router';
import { ArticleService } from './../../../department-functionality/services/article.service';
import { ShortArticle } from './../../../data/models/shortArticle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  articles: ShortArticle[];

  constructor(private articleService: ArticleService, private router: Router) {
    this.articleService.getArticles().subscribe(value => {
      this.articles = value;
    });
  }

  ngOnInit() {
  }

  goToArticle(id: number) {
    console.log(id);
  }
}