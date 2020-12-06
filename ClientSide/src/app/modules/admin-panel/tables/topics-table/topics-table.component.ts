import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/data/models/topic';
import { MatDialog } from '@angular/material/dialog';
import { AddTopicComponent } from '../../forms/add-topic/add-topic/add-topic.component';

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

  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit() {
    this.adminService.getTopics().subscribe(value => {
      this.topics = value;
      console.log(this.topics);
    });
  }

  delete(id: number) {
    this.adminService.deleteTopic(id).subscribe(value => {
      console.log(value);
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AddTopicComponent, {
      width: '250px',
      data: { name: this.name, title: this.title, buttonName: "Створити" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed  ' + result);
      this.name = result;
      if (result) {
        const topic: Topic = {
          id: 0,
          name: result
        };
        this.adminService.addTopic(topic).subscribe(value => {
          console.log(value);
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
        const topic: Topic = {
          id: id,
          name: result
        };
        this.adminService.updateTopic(topic).subscribe(value => {
          console.log(value);
        });
      }
    });
  }
}