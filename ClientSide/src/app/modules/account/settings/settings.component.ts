import { Component, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordFormComponent } from '../change-password-form/change-password-form.component';
import { EventEmitter } from 'events';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { User } from 'src/app/data/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User;
  pageForm: FormGroup;
  isFormEnabled = false;
  isDialogOpen = false;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
    const uId = localStorage.getItem('uId');
    this.accountService.getUser(uId).subscribe(value => {
      console.log('user got');
      this.user = value;
      this.initForm();
    });
  }

  ngOnInit(): void {
  }

  initForm(): void {
    this.pageForm = this.fb.group({
      email: [this.user.email],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      age: [this.user.age],
      userName: [this.user.userName],
      phoneNumber: [this.user.phoneNumber]
    });
    this.pageForm.disable();
  }

  onSubmit(): void {
    this.pageForm.disable();
    const model: User = {
      email: this.pageForm.get('email').value,
      firstName: this.pageForm.get('firstName').value,
      lastName: this.pageForm.get('lastName').value,
      age: Number(this.pageForm.get('age').value),
      userName: this.pageForm.get('userName').value,
      phoneNumber: this.pageForm.get('phoneNumber').value,
      id: this.user.id,
      role: null,
      roles: null
    };
    this.accountService.updateUser(model).subscribe(value => {
      if (value) {
        this.user = model;
        this.snackBar.open('Зміни збережено', 'Подякував', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['my-snack'],
          politeness: 'assertive'
        });
      }
    });
    this.isFormEnabled = !this.isFormEnabled;
  }

  toogleForm(): void {
    this.isFormEnabled = !this.isFormEnabled;
    this.isFormEnabled === true ? this.pageForm.enable() : this.pageForm.disable();
  }

  changePassword(): void {
    let dialogRef;
    dialogRef = this.dialog.open(ChangePasswordFormComponent, {
      width: '450px',
      panelClass: 'my-dialog-window'
    });
    dialogRef.afterOpened().subscribe(res => {
      this.isDialogOpen = true;
    });
    dialogRef.afterClosed().subscribe((value) => {
      this.isDialogOpen = false;
      if (value.success) {
        this.snackBar.open('Пароль змінено', 'Подякував', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['my-snack'],
          politeness: 'assertive'
        });
      }
    });
  }
}