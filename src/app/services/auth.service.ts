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
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {
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

  // get profile details
  public getStudentProfile(id) {
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://localhost:8080/students/get/:' + id, { headers: this.headers }).pipe(map(res => res));
  }
  public getTeacherProfile(id) {
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://localhost:8080/teachers/get/:' + id, { headers: this.headers }).pipe(map(res => res));
  }
  public getAssistantProfile(id) {
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://localhost:8080/assistants/get/:' + id, { headers: this.headers }).pipe(map(res => res));
  }
}
