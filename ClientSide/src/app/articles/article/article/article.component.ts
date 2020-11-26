import { ArticleService } from '../../services/article.service';
import { Article } from './../../../data/models/article';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article;

  constructor(private route: ActivatedRoute, private aArticleService: ArticleService) { }

  ngOnInit() {
  }
}