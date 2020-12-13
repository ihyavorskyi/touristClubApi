import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/data/models/category';
import { Topic } from 'src/app/data/models/topic';
import { AddTopicComponent } from '../../forms/add-topic/add-topic/add-topic.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  title = "Кетегорія";
  name: string;

  categories: Category[];

  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private adminService: AdminService, public dialog: MatDialog,
    private snackBar: MatSnackBar, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.adminService.getCategories().subscribe(value => {
      this.categories = value;
      this.changeDetectorRefs.detectChanges();
    });
  }

  showSnackBar(messadge: string) {
    this.snackBar.open(messadge, 'Подякував', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['my-snack'],
      politeness: 'assertive'
    });
  }

  delete(id: number) {
    this.adminService.deleteCategory(id).subscribe(value => {
      this.categories = this.categories.filter(rec => rec.id !== id);
      this.showSnackBar('Видалено');
    });
  }


  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AddTopicComponent, {
      width: '250px',
      data: { name: this.name, title: this.title, buttonName: "Створити" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
      if (result) {
        const category: Category = { id: 0, name: result, excursions: null };
        this.adminService.addCategory(category).subscribe(value => {
          this.showSnackBar('Створено');
          this.refresh();
        });
      }
    });
  }

  openDialogUpdate(name: string, id: number): void {
    const dialogRef = this.dialog.open(AddTopicComponent, {
      width: '250px',
      data: { name: name, title: this.title, buttonName: "Оновити" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed  ' + result);
      if (result) {
        const category: Category = { id: id, name: result, excursions: null };
        this.adminService.updateCategory(category).subscribe(value => {
          this.showSnackBar('Оновлено');
          this.refresh();
        });
      }
    });
  }
}