import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article/article.component';
import { MaterialModule } from '../material/material.module';
import { ArticlesListComponent } from './articles-list/articles-list/articles-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ArticleComponent,
    ArticlesListComponent
  ]
})
export class ArticlesModule { }