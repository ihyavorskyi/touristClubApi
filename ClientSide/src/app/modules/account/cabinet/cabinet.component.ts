import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/data/models/user';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordFormComponent } from '../change-password-form/change-password-form.component';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  user: User;
  pageForm: FormGroup;
  photoPath: string;
  depPhotoParh: string;
  public response: { dbPath: '' };
  timeStamp: number;

  pageFormSetting: FormGroup;
  isFormEnabled = false;
  isDialogOpen = false;


  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private fbSetting: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
    const uId = localStorage.getItem('uId');
    this.accountService.getUser(uId).subscribe(value => {
      console.log('user got');
      this.user = value;
      this.photoPath = `https://localhost:5001/api/account/avatar/${this.user.id}`;
      this.initFormSet();
    });
  }

  ngOnInit(): void {
  }

  
  initFormSet(): void {
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

  initForm(): void {
    this.pageForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]]
    });
  }

  public getLinkPicture() {
    if (this.timeStamp) {
      return this.photoPath + '?' + this.timeStamp;
    }
    return this.photoPath;
  }

  public getDepartmentLinkPicture() {
    if (this.timeStamp) {
      return this.photoPath + '?' + this.timeStamp;
    }
    return this.depPhotoParh;
  }

  public setLinkPicture(url: string) {
    this.photoPath = url;
    this.timeStamp = (new Date()).getTime();
  }

  public uploadFinished = (event) => {
    this.setLinkPicture(this.photoPath);
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
      role: null
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
