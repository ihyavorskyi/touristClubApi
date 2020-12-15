import { getLocaleWeekEndRange } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  burgerActive: boolean;
  isUserAuthenticated = false;

  isAdmin = false;

  static isJournalist = false;

  roles: string[];

  constructor(private router: Router, private authService: AuthService) {
    this.burgerActive = false;
    this.isUserAuthenticated = this.authService.isUserAuthenticated();
  }

  ngOnInit(): void {
    if (localStorage.getItem('uId') != null) {
      this.authService.roles(localStorage.getItem('uId')).subscribe(value => {
        this.roles = value;
        for (let i = 0; i < this.roles.length; i++) {
          if (this.roles[i] == "admin") {
            this.isAdmin = true;
          } else if (this.roles[i] == "journalist") {
            HeaderComponent.isJournalist = true;
          }
        }
      });
    }
  }

  burgerClick(): void {
    this.burgerActive = !this.burgerActive;
    document.body.classList.toggle('lock');
    const arra = ['a', 'b', 'c'];
    let isA = arra.some(value => value.includes('a'));
  }

  logOut() {
    this.router
      .navigateByUrl('/RELOAD_PLACEHOLDER', { skipLocationChange: true })
      .then(() => this.router.navigateByUrl('/'));
    this.authService.logOut();
    this.isUserAuthenticated = this.authService.isUserAuthenticated();
  }
}