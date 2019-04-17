import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {
    // this.headers.append('Access-Control-Allow-Origin': '*');
  }

  public login(username, password) {
    return this.http.post('http://localhost:8080/user/login', { 'username': username, 'password': password }).pipe(map(res => res));
  }
  public register(username, email, password, retype) {
    // tslint:disable-next-line:max-line-length
    return this.http.post('http://localhost:8080/user/register', { 'username': username, 'email': email, 'password': password, 'confirm_password': retype }).pipe(map(res => res));
  }
  public isAuthenticated(): boolean {
    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }

  }
}
