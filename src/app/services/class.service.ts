import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private http: HttpClient) { }

  /* get classes */
  getClasses() {
    return this.http.get('http://localhost:8080/classes/', { headers: this.headers }).pipe(map(res => res));
  }
  getClassesByTeacher(search_word) {
    // tslint:disable-next-line:max-line-length
    return this.http.post('http://localhost:8080/classes/get/by-teacher', { 'search_word': search_word }, { headers: this.headers }).pipe(map(res => res));
  }
  getClassesBySubject(search_word) {
    // tslint:disable-next-line:max-line-length
    return this.http.post('http://localhost:8080/classes/get/by-subject', { 'search_word': search_word }, { headers: this.headers }).pipe(map(res => res));
  }
  getClassesByBatch(search_word) {
    // tslint:disable-next-line:max-line-length
    return this.http.post('http://localhost:8080/classes/get/by-batch', { 'search_word': search_word }, { headers: this.headers }).pipe(map(res => res));
  }
  getClassesByDay(search_word) {
    // tslint:disable-next-line:max-line-length
    return this.http.post('http://localhost:8080/classes/get/by-day', { 'search_word': search_word }, { headers: this.headers }).pipe(map(res => res));
  }

  /* get batch */
  getBatches() {
    return this.http.get('http://localhost:8080/classes/batches', { headers: this.headers }).pipe(map(res => res));
  }

  /* get classes of a  student */
  getClassesOfStudent(std_id) {
    return this.http.get('http://localhost:8080/students/get/classes/' + std_id, { headers: this.headers }).pipe(map(res => res));
  }

  /*get classes of a teacher */
  getClassesOfTeacher(tea_id) {
    return this.http.get('http://localhost:8080/teachers/get/classes/' + tea_id, { headers: this.headers }).pipe(map(res => res));
  }
  /*get classes of an assistant */
  getClassesOfAssistant(ass_id) {
    return this.http.get('http://localhost:8080/assistants/get/classes/' + ass_id, { headers: this.headers }).pipe(map(res => res));
  }
}
