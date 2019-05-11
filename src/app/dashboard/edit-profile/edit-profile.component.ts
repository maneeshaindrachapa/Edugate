import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  username = '';
  role = '';
  profile_pic = 'people-avatar-1.jpg'; // default prof pic
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.username = this.getDecodedAccessToken(localStorage.getItem('token'))['username'];
    console.log(this.getDecodedAccessToken(localStorage.getItem('token')));

    this.auth.getUserProfile(this.getDecodedAccessToken(localStorage.getItem('token'))['user_id']).subscribe(success => {
      console.log(success);
    }, error => {
      console.log(error);
    });
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
