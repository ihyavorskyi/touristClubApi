import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Topic } from 'src/app/data/models/topic';
import { MatDialog } from '@angular/material/dialog';
import { AddTopicComponent } from '../../forms/add-topic/add-topic/add-topic.component';
import { MySnackBar } from 'src/app/common/snack-bar.service';

@Component({
  selector: 'app-topics-table',
  templateUrl: './topics-table.component.html',
  styleUrls: ['./topics-table.component.scss']
})
export class TopicsTableComponent implements OnInit {

  title = "Тематика";
  name: string;

  topics: Topic[];

  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private adminService: AdminService, 
    public dialog: MatDialog, 
    private snackBar: MySnackBar,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.adminService.getTopics().subscribe(value => {
      this.topics = value;
      this.changeDetectorRefs.detectChanges();
      
    });
  }

  delete(id: number) {
    this.adminService.deleteTopic(id).subscribe(value => {
      this.topics = this.topics.filter(rec => rec.id !== id);
      this.snackBar.showSnackBar('Видалено');
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
        const topic: Topic = { id: 0, name: result };
        this.adminService.addTopic(topic).subscribe(value => {
          this.snackBar.showSnackBar('Ствoрено');
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
      if (result) {
        const topic: Topic = { id: id, name: result };
        this.adminService.updateTopic(topic).subscribe(value => {
          this.snackBar.showSnackBar('Оновлено');
          this.refresh();
        });
      }
    });
  }
}