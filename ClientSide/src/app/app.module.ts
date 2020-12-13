import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './common/guards/auth-guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DepartmentModule } from './modules/department-functionality/department.module';
import { DepartmentComponent } from './modules/department-functionality/department/department.component';
import { DepartmentsListComponent } from './modules/department-functionality/departments-list/departments-list.component';
import { AddRecordFormComponent } from './modules/department-functionality/forms/add-record-form/add-record-form.component';
import { AccountModule } from './modules/account/account.module';
import { CabinetComponent } from './modules/account/cabinet/cabinet.component';
import { ChangePasswordFormComponent } from './modules/account/change-password-form/change-password-form.component';
import { SettingsComponent } from './modules/account/settings/settings.component';
import { SupportComponent } from './modules/account/support/support.component';
import { ArticleComponent } from './modules/articles/article/article/article.component';
import { ArticlesListComponent } from './modules/articles/articles-list/articles-list/articles-list.component';
import { AuthInterceptor } from './modules/auth/auth-interceptor';
import { LoginModule } from './modules/auth/login.module';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegistrationComponent } from './modules/auth/registration/registration.component';
import { ExcursionComponent } from './modules/excursion/excursion/excursion/excursion.component';
import { ExursionsComponent } from './modules/excursion/exursions/exursions.component';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { MaterialModule } from './modules/material/material.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { ExcursionsModule } from './modules/excursion/excursions.module';
import { MakeAReservationDialogComponent } from './modules/excursion/makeAReservationDialog/makeAReservationDialog/makeAReservationDialog.component';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';
import { AdminPanelComponent } from './modules/admin-panel/admin-panel/admin-panel.component';
import { MyReservationComponent } from './modules/account/my-reservation/my-reservation.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  entryComponents: [
    AddRecordFormComponent,
    ChangePasswordFormComponent,
    MakeAReservationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    RouterModule.forRoot(
      [
        { path: 'auth/login', component: LoginComponent },
        { path: 'auth/registration', component: RegistrationComponent },
        { path: 'account/cabinet', component: CabinetComponent, canActivate: [AuthGuard] },
        { path: 'account/cabinet/support', component: SupportComponent, canActivate: [AuthGuard] },
        { path: 'account/cabinet/reservations', component: MyReservationComponent, canActivate: [AuthGuard] },
        { path: 'main', component: MainPageComponent },
        { path: 'articles', component: ArticlesListComponent },
        { path: 'article/:id', component: ArticleComponent },
        { path: 'excursions', component: ExursionsComponent },
        { path: 'excursion/:id', component: ExcursionComponent },
        { path: 'admin', component: AdminPanelComponent },
        { path: '**', redirectTo: 'main' }

      ]),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DepartmentModule,
    ArticlesModule,
    ExcursionsModule,
    AdminPanelModule,
    AccountModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: []
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE, useValue: MY_DATE_FORMATS
    }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
