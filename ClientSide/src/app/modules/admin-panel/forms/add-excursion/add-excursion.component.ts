import { Category } from './../../../../data/models/category';
import { Excursion } from 'src/app/data/models/excursion';
import { AdminService } from './../../services/admin.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-add-excursion',
  templateUrl: './add-excursion.component.html',
  styleUrls: ['./add-excursion.component.scss']
})
export class AddExcursionComponent implements OnInit {
  categories: Category[];

  constructor(
    public dialogRef: MatDialogRef<AddExcursionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getCategories().subscribe(value => {
      this.categories = value;
      console.log(this.categories);
    });
  }

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }

  addEvent(event: MatDatepickerInputEvent<Date>): void {
    this.data.date = event.value;
  }

  onSubmit() {
    const excursion: Excursion = {
      id: 0,
      name: this.data.name,
      price: Number(this.data.price),
      numberOfSeats: Number(this.data.numberOfSeats),
      categoryId: Number(this.data.categoryId),
      description: this.data.description,
      image: this.data.image,
      date: this.data.date
    };

    console.log(excursion);


    if (this.data.choser == 1) {
      this.adminService.addExcursion(excursion).subscribe(value => {
        console.log(value);
      });
    } else {
      excursion.id = this.data.id;
      this.adminService.updateExcursion(excursion).subscribe(value => {
        console.log(value);
      });
    }
    this.dialogRef.close();
  }
}

export interface DialogData {
  choser: number;
  id: number;
  name: string;
  description: string;
  price: number;
  numberOfSeats: number;
  image: string;
  categoryId: number;
  date: Date;
}