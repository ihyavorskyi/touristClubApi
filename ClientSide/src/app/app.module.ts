import { MakeAReservationDialogComponent } from './excursion/makeAReservationDialog/makeAReservationDialog/makeAReservationDialog.component';
import { ExcursionComponent } from './excursion/excursion/excursion/excursion.component';
import { ExursionsComponent } from './excursion/exursions/exursions.component';
import { ArticlesListComponent } from './articles/articles-list/articles-list/articles-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CabinetComponent } from './account/cabinet/cabinet.component';
import { LoginModule } from './auth/login.module';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { SettingsComponent } from './account/settings/settings.component';
import { SupportComponent } from './account/support/support.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './common/guards/auth-guard';
import { AuthInterceptor } from './auth/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CabinetNavComponent } from './navigation/cabinet-nav/cabinet-nav.component';
import { AccountModule } from './account/account.module';
import { ChangePasswordFormComponent } from './account/change-password-form/change-password-form.component';
import { ArticleComponent } from './articles/article/article/article.component';
import { DepartmentModule } from './modules/department-functionality/department.module';
import { DepartmentComponent } from './modules/department-functionality/department/department.component';
import { DepartmentsListComponent } from './modules/department-functionality/departments-list/departments-list.component';
import { AddRecordFormComponent } from './modules/department-functionality/forms/add-record-form/add-record-form.component';

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
    MainPageComponent,
    ArticlesListComponent,
    ArticleComponent,
    ExursionsComponent,
    ExcursionComponent,
    MakeAReservationDialogComponent
  ],
  entryComponents: [AddRecordFormComponent, ChangePasswordFormComponent],
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
        { path: 'account/cabinet/settings', component: SettingsComponent, canActivate: [AuthGuard] },
        { path: 'account/cabinet/support', component: SupportComponent, canActivate: [AuthGuard] },
        { path: 'departments', component: DepartmentsListComponent },
        { path: 'department/:id', component: DepartmentComponent },
        { path: 'main', component: MainPageComponent },
        { path: 'articles', component: ArticlesListComponent },
        { path: 'article/:id', component: ArticleComponent },
        { path: 'excursions', component: ExursionsComponent },
        { path: 'excursion/:id', component: ExcursionComponent },
        { path: '**', redirectTo: 'main' }

      ]),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DepartmentModule,
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
