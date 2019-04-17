import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {
  username = '';
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.username = this.getDecodedAccessToken(localStorage.getItem('token'))['username'];
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
