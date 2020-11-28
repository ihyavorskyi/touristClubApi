import { Comment } from './../../../data/models/comment';
import { sendComment } from './../../../data/models/sendComment';
import { CommentService } from './../../services/comment.service';
import { ArticleService } from '../../services/article.service';
import { Article } from './../../../data/models/article';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article;
  articleId: number;
  text: string;
  comments: Comment[];

  length: number;
  pageSize = 2;
  pageSizeOptions: number[] = [1, 3, 5, 10];

  constructor(private route: ActivatedRoute, private articleService: ArticleService,
    private commentService: CommentService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.articleId = params.id;
        this.articleService.getArticle(this.articleId).subscribe(ar => {
          this.article = ar;
          this.length = this.article.comments.length;
          this.comments = this.article.comments.slice(0, 2);
          console.log(this.article);
        });
      }
    });
  }

  addComment(item) {
    if (item.value != '') {
      const comment: sendComment = {
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

  public getLinkPicture(id: number) {
    return `https://localhost:5001/api/articles/image/${id}`;
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.article.comments.length) {
      endIndex = this.article.comments.length;
    }
    this.comments = this.article.comments.slice(startIndex, endIndex);
  }
}