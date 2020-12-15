import { AdminService } from 'src/app/modules/admin-panel/services/admin.service';
import { Role } from './../../../../data/models/role';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MySnackBar } from 'src/app/common/snack-bar.service';

@Component({
  selector: 'app-cnange-role',
  templateUrl: './cnange-role.component.html',
  styleUrls: ['./cnange-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {

  roles: Role[];

  constructor(private adminService: AdminService,
    private snackBar: MySnackBar,
    public dialogRef: MatDialogRef<ChangeRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.adminService.getRoles().subscribe(value => {
      this.roles = value;
    });
  }

  onOkClick() {
    const role: Role = {
      userId: this.data.userId,
      role: this.data.role
    }
    this.adminService.changeRole(role).subscribe(value => {
      this.snackBar.showSnackBar('Роль змінено');
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  userId: string;
  role: string;
}
