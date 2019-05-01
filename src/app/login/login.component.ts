import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  user = { username: '', password: '' };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    if (this.user.username !== '' && this.user.password !== '') {
      this.auth.login(this.user.username, this.user.password).subscribe(success => {
        localStorage.setItem('token', success['token']);
        localStorage.setItem('role', this.getDecodedAccessToken(success['token'])['role']); // save token in localstorage
        this.router.navigate(['dashboard']);
      }, error => {
        console.log(error);
      });
    } else {
      console.log('fill');
    }
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
