import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = { username: '', email: '', password: '', retype: '' };
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.router.navigate(['login']);
  }
  register() {
    if (this.user.username !== '' && this.user.email !== '' && this.user.password !== '' && this.user.retype !== '') {
      this.auth.register(this.user.username, this.user.email, this.user.password, this.user.retype).subscribe(Sucess => {
        console.log(Sucess);
      }, error => {
        console.log(error);
      });
    }
  }
}
