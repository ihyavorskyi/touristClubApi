import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from './cabinet/cabinet.component';
import { SettingsComponent } from './settings/settings.component';
import { SupportComponent } from './support/support.component';
import { CabinetNavComponent } from '../navigation/cabinet-nav/cabinet-nav.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { CabinetHeaderComponent } from './cabinet-header/cabinet-header.component';
import { UploadHelperComponent } from './extensions/upload-helper/upload-helper.component';
import { CreateUserFormComponent } from './forms/create-user-form/create-user-form.component';


@NgModule({
  declarations: [
    CabinetComponent,
    SettingsComponent,
    SupportComponent,
    CabinetNavComponent,
    ChangePasswordFormComponent,
    CabinetHeaderComponent,
    UploadHelperComponent,
    CreateUserFormComponent
  ],
  imports: [
    CommonModule, MaterialModule, FormsModule, ReactiveFormsModule
  ]
})
export class AccountModule {
}
