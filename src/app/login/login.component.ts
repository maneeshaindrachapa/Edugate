import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  user = { username: '', password: '' };

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    if (this.user.username !== '' && this.user.password !== '') {
      this.auth.login(this.user.username, this.user.password).subscribe(success => {
        localStorage.setItem('token', success['token']); // save token in localstorage
      }, error => {
        console.log(error);
      });
    } else {
      console.log('fill');
    }
  }
}
