import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/data/models/category';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  categories: Category[];

  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getCategories().subscribe(value => {
      this.categories = value;
      console.log(this.categories);
    });
  }

  delete(id: number) {    
    this.adminService.deleteCategory(id).subscribe(value => {
      console.log(value);
    });
  }
}
