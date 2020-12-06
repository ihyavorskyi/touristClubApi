import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MaterialModule } from '../material/material.module';
import { TopicsTableComponent } from './tables/topics-table/topics-table.component';
import { CategoriesTableComponent } from './tables/categories-table/categories-table.component';
import { ArticlesTableComponent } from './tables/articles-table/articles-table.component';
import { ExcursionTableComponent } from './tables/excursion-table/excursion-table/excursion-table.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AddTopicComponent } from './forms/add-topic/add-topic/add-topic.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatButtonModule
  ],
  declarations: [
    AdminPanelComponent,
    TopicsTableComponent,
    CategoriesTableComponent,
    ArticlesTableComponent,
    ExcursionTableComponent,
    AddTopicComponent
  ]
})
export class AdminPanelModule { }
