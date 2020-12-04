import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/data/models/category';


@Component({
  selector: 'app-exursions',
  templateUrl: './exursions.component.html',
  styleUrls: ['./exursions.component.scss']
})
export class ExursionsComponent implements OnInit {
  category: Category[];

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryService.getCategoriesWithExursions().subscribe(value => {
      this.category = value;
      console.log(this.category);
    });
  }


}