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
  articleId: number;
  value = 'Clear me';

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() {
    console.log('NgOnInit');
    this.route.params.subscribe(params => {
      if (params.id) {
        this.articleId = params.id;
        this.articleService.getArticle(this.articleId).subscribe(ar => {
          console.log('GOT id = ' + ar.id + ' / title = ' + ar.title);
          this.article = ar;
        });
      }
    });
  }

  sendComment(item) {
    alert(item.value);
  }
}