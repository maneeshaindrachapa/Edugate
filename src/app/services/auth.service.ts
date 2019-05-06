import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  student: any;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {
  }
  // getter and  setter for student
  getStudent() {
    return this.student;
  }
  setStudent(s) {
    this.student = s;
  }

  // login and register;
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
    return this.http.get('http://localhost:8080/students/get/' + id, { headers: this.headers }).pipe(map(res => res));
  }
  public getTeacherProfile(id) {
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://localhost:8080/teachers/get/' + id, { headers: this.headers }).pipe(map(res => res));
  }
  public getAssistantProfile(id) {
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://localhost:8080/assistants/get/' + id, { headers: this.headers }).pipe(map(res => res));
  }

  /*get people*/
  public getStudents() {
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://localhost:8080/students/', { headers: this.headers }).pipe(map(res => res));
  }

  /* add student */
  public addStudent(personalDetails, GuardianDetails, batchDetails, Classes) {
    return this.http.post('http://localhost:8080/students/add',
      {
        'first_name': personalDetails.first_name,
        'last_name': personalDetails.last_name,
        'address': { 'lines': personalDetails.address, 'city': personalDetails.city },
        'email': personalDetails.email,
        'telephone': { 'number': personalDetails.telephone, 'mobile': false },
        'guardian': { 'name': GuardianDetails.name, 'telephone': GuardianDetails.telephone },
        'emergency_contact': GuardianDetails.emergency_contact,
        'admission_date': '2019-03-20',
        'addmission_batch': batchDetails,
        'current_batch': batchDetails,
        'class_info': [{ 'class_id': '', 'fees_rate': 1 }]
      }).pipe(map(res => res));
  }
  /* update student */
  public updateStudent(personalDetails, GuardianDetails, batchDetails, Classes) {
    return this.http.post('http://localhost:8080/students/add',
      {
        'first_name': personalDetails.first_name,
        'last_name': personalDetails.last_name,
        'address': { 'lines': personalDetails.address, 'city': personalDetails.city },
        'email': personalDetails.email,
        'telephone': { 'number': personalDetails.telephone, 'mobile': false },
        'guardian': { 'name': GuardianDetails.name, 'telephone': GuardianDetails.telephone },
        'emergency_contact': GuardianDetails.emergency_contact,
        'admission_date': '2019-03-20',
        'addmission_batch': batchDetails,
        'current_batch': batchDetails,
        'class_info': [{ 'class_id': '', 'fees_rate': 1 }]
      }).pipe(map(res => res));
  }
  /* Delete Student */
  deleteStudent(std_id) {
    return this.http.delete('http://localhost:8080/students/delete/' + std_id, { headers: this.headers }).pipe(map(res => res));
  }
}

