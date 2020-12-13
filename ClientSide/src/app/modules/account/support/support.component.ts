import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MySnackBar } from 'src/app/common/snack-bar.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  text = '';

  constructor(private snackBar: MySnackBar) {
  }

  ngOnInit(): void {
  }

  click() {
    this.snackBar.showSnackBar('Дякуємо за звернення');
    this.text = ' ';
    // @ts-ignore
    document.getElementById('exampleFormControlTextarea1').value = '';
  }
}
