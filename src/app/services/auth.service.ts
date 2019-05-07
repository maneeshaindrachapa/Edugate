import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  student: any;
  teacher: any;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {
  }
  // getters and  setters
  getStudent() {
    return this.student;
  }
  setStudent(s) {
    this.student = s;
  }
  getTeacher() {
    return this.teacher;
  }
  setTeacher(s) {
    this.teacher = s;
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
    return this.http.get('http://localhost:8080/students/', { headers: this.headers }).pipe(map(res => res));
  }
  public getTeachers() {
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://localhost:8080/teachers/', { headers: this.headers }).pipe(map(res => res));
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

  /* add teacher */
  public addTeacher(personalDetails) {
    return this.http.post('http://localhost:8080/teachers/add',
      {
        'first_name': personalDetails.firstName,
        'last_name': personalDetails.lastName,
        'address': personalDetails.address,
        'city': personalDetails.city,
        'email': personalDetails.email,
        'telephone': personalDetails.telephone,
        'nic': personalDetails.nic,
        'admission_date': personalDetails.admissiondate,
        'birthday': personalDetails.birthday
      }, { headers: this.headers }).pipe(map(res => res));
  }
  /* Edit Teacher */
  public editTeacher(personalDetails) {
    return this.http.post('http://localhost:8080/teachers/update/:' + personalDetails['teacher_id'],
      {
        'first_name': personalDetails['first_name'],
        'last_name': personalDetails['last_name'],
        'address': personalDetails['address']['lines'],
        'city': personalDetails['address']['city'],
        'email': personalDetails['email'],
        'telephone': personalDetails['telephone'],
        'nic': personalDetails['nic'],
        'admission_date': personalDetails['admission_date'],
        'birthday': personalDetails['birthday']
      }, { headers: this.headers }).pipe(map(res => res));
  }
  /* Delete teacher */
  deleteTeacher(tea_id) {
    return this.http.delete('http://localhost:8080/teachers/delete/' + tea_id, { headers: this.headers }).pipe(map(res => res));
  }
}

