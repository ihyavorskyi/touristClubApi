import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/models/article';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss']
})
export class ArticlesTableComponent implements OnInit {

  articles: Article[];

  displayedColumns: string[] = ['id', 'name', 'description', 'date', 'actions'];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getArticles().subscribe(value => {
      this.articles = value;
      console.log("Article -> ");
      console.log(this.articles);
    });
  }

  delete(id: number) {
    this.adminService.deleteArticle(id).subscribe(value => {
      console.log(value);
    });
  }
}
