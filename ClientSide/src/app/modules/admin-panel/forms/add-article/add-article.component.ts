import { Topic } from './../../../../data/models/topic';
import { AdminService } from './../../services/admin.service';
import { sendComment } from './../../../../data/models/sendComment';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/data/models/article';
import { NewArticle } from 'src/app/data/models/newArticle';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  article: Article;
  pageForm: FormGroup;

  topics: Topic[];

  constructor(
    public dialogRef: MatDialogRef<AddArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private adminService: AdminService) {

  }

  ngOnInit() {
    this.adminService.getTopics().subscribe(value => {
      this.topics = value;
      console.log(this.topics);
    });
  }

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }

  onSubmit() {
    const article: NewArticle = {
      id: 0,
      topicId: Number(this.data.topicId),
      title: this.data.title,
      authorId: localStorage.getItem("uId"),
      text: this.data.text,
      description: this.data.description,
      image: this.data.image
    };

    if (this.data.choser == 1) {
      this.adminService.addArticle(article).subscribe(value => {
        console.log(value);
      });
    } else {
      article.id = this.data.id;
      this.adminService.updateArticle(article).subscribe(value => {
        console.log(value);
      });
    }
    this.dialogRef.close();
  }
}

export interface DialogData {
  id: number;
  choser: number;
  title: string;
  description: string;
  text: string;
  topicId: number;
  image: string;
}