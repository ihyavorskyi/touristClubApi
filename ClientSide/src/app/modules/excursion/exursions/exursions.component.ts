import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/data/models/category';

@Component({
  selector: 'app-exursions',
  templateUrl: './exursions.component.html',
  styleUrls: ['./exursions.component.scss']
})
export class ExursionsComponent implements OnInit {
  category: Category[];

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.categoryService.getCategoriesWithExursions().subscribe(value => {
      this.category = value;
      console.log(this.category);
    });
  }

  goToExcursion(id: number) {
    this.router.navigateByUrl(`/excursion/${id}`);
  }

  public getLinkPicture(id: number) {
    return `https://localhost:5001/api/excursions/image/${id}`;
  }
}