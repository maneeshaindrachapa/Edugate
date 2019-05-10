import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private http: HttpClient) { }

  getStudentAttendence(std_id) {
    return this.http.get('http://localhost:8080/attendance/get/' + std_id, { headers: this.headers }).pipe(map(res => res));
  }
  public mark(std_id, class_id, class_date) {
    return this.http.post('http://localhost:8080/attendance/mark',
      {
        'student_id': std_id,
        'class_id': class_id,
        'class_date': class_date
      }, { headers: this.headers }).pipe(map(res => res));
  }
  public top_up(std_id, class_id, for_, amount) {
    return this.http.post('http://localhost:8080/attendance/topup',
      {
        'student_id': std_id,
        'class_id': class_id,
        '_for': for_,
        'amount': amount
      }, { headers: this.headers }).pipe(map(res => res));
  }
}
