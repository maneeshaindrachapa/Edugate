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
  addClass(subject_id, batch_id, group_id, teacher_id, starting_date, starting_time, ending_time, fees, daily_fees) {
    if (daily_fees === 'yes') {
      daily_fees = true;
    } else {
      daily_fees = false;
    }
    return this.http.post('http://localhost:8080/classes/add',
      {
        'subject_id': subject_id,
        'batch_id': batch_id,
        'group_id': group_id,
        'teacher_id': teacher_id,
        'starting_date': starting_date,
        'ending_time': ending_time,
        'starting_time': starting_time,
        'fees': fees,
        'daily_fees': daily_fees
      },
      { headers: this.headers }).pipe(map(res => res));
  }

  /* get batch */
  getBatches() {
    return this.http.get('http://localhost:8080/classes/batches', { headers: this.headers }).pipe(map(res => res));
  }
  addBatch(category, year) {
    return this.http.post('http://localhost:8080/classes/add/batch', { 'category': category, 'year': year },
      { headers: this.headers }).pipe(map(res => res));
  }
  /* get groups */
  getGroups() {
    return this.http.get('http://localhost:8080/classes/groups', { headers: this.headers }).pipe(map(res => res));
  }
  addGroup(category, name) {
    return this.http.post('http://localhost:8080/classes/add/group', { 'category': category, 'name': name },
      { headers: this.headers }).pipe(map(res => res));
  }
  /* get subjects */
  getSubjects() {
    return this.http.get('http://localhost:8080/classes/subjects', { headers: this.headers }).pipe(map(res => res));
  }
  addSubject(stream, subjectName) {
    return this.http.post('http://localhost:8080/classes/add/subject', { 'stream': stream, 'subject': subjectName },
      { headers: this.headers }).pipe(map(res => res));
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
  /* Deassign Assistant */
  deassignAssistant(ass_id, class_details) {
    return this.http.post('http://localhost:8080/assistants/deassign/:' + ass_id,
      { 'deassign_info': class_details }, { headers: this.headers }).pipe(map(res => res));
  }
  /* assign Assistant */
  assignAssistant(ass_id, class_details) {
    return this.http.post('http://localhost:8080/assistants/assign/:' + ass_id,
      { 'class_info': class_details }, { headers: this.headers }).pipe(map(res => res));
  }

  /* marking*/
  enableMarking(class_id, class_) {
    return this.http.post('http://localhost:8080/classes/enable/:' + class_id,
      { 'class': class_ }, { headers: this.headers }).pipe(map(res => res));
  }
  /* delete class */
  deleteClass(class_id) {
    return this.http.delete('http://localhost:8080/classes/delete/' + class_id, { headers: this.headers }).pipe(map(res => res));
  }
}
