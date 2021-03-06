import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordRequest } from 'src/app/data/models/ChangePasswordRequest';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {
  pageForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordFormComponent>,
    private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.pageForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]]
    });
  }

  close(result: boolean): void {
    this.dialogRef.close({ success: result });

  }

  onSubmit(): void {
    const model: ChangePasswordRequest = {
      oldPassword: this.pageForm.get('oldPassword').value,
      newPassword: this.pageForm.get('newPassword').value,
      id: localStorage.getItem('uId')
    };
    console.log('model - ' + model);
    this.accountService.changePassword(model).subscribe(value => {
      if (value) {
        this.close(true);
      }
    });
  }

}
