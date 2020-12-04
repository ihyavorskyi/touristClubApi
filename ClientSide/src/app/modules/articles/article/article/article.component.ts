
import { CommentService } from './../../services/comment.service';
import { ArticleService } from '../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Article } from 'src/app/data/models/article';
import { sendComment } from 'src/app/data/models/sendComment';
import { Comment } from 'src/app/data/models/comment';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article;
  articleId: number;
  comments: Comment[];
  needPaginator: boolean;

  length: number;
  pageSize = 3;
  pageSizeOptions: number[] = [1, 3, 5, 10];

  constructor(private route: ActivatedRoute, private articleService: ArticleService,
    private commentService: CommentService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.articleId = params.id;
        this.articleService.getArticle(this.articleId).subscribe(ar => {
          this.article = ar;
          this.areAnyComments();
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
      this.commentService.addComment(comment).subscribe(value => {
        console.log(value);
      });
    }
  }

  public getLinkPicture(id: number) {
    return `https://localhost:5001/api/articles/image/${id}`;
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
/* 
      switch (this.article.comments.length) {
        case 2: this.pageSize = 2; break;
        case 3: this.pageSize = 3; break;
        default: this.pageSize = 1; break;
      } */

      this.comments = this.article.comments.slice(0, this.pageSize);
      this.needPaginator = true;
    }
  }
}