import { Role } from './../../../../data/models/role';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MySnackBar } from 'src/app/common/snack-bar.service';
import { User } from 'src/app/data/models/user';
import { ChangeRoleComponent } from '../../forms/cnange-role/cnange-role.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  tabLoadTimes: Date[] = [];
  users: User[];
  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'email', 'phone', 'age', 'role', 'edit'];

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private snackBar: MySnackBar) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.adminService.getUsers().subscribe(value => {
      this.users = value;
    });
  }

  cnangeRole(id: string, role: string) {
    console.log(id);
    const dialogRef = this.dialog.open(ChangeRoleComponent, {
      width: '250px',
      data: { userId: id, role: role }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  delete(id: string) {
    this.adminService.deleteUser(id).subscribe(value => {
      console.log(value);
      this.snackBar.showSnackBar('Видален');
    });
  }
}