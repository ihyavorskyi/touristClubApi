import { CommentService } from './../../services/comment.service';
import { Comment } from './../../../data/models/comment';
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
  text: string;

  constructor(private route: ActivatedRoute, private articleService: ArticleService,
    private commentService: CommentService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.articleId = params.id;
        this.articleService.getArticle(this.articleId).subscribe(ar => {
          this.article = ar;    
          console.log(ar);

          console.log(this.article);
               
        });
      }
    });    
  }

  sendComment(item) {
    if (item.value != '') {
      const comment: Comment = {
        id: 0,
        text: item.value,
        authorId: localStorage.getItem("uId"),
        articleId: Number(this.articleId)
      };
      this.commentService.addRecord(comment).subscribe(value => {
        console.log(value);
      });
    }
  }
}