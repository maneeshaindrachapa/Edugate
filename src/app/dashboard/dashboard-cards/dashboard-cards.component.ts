import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent implements OnInit {
  role = '';
  teachers = true;
  assistants = true;
  students = true;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    if (this.role === 'teacher') {
      this.teachers = false;
    } else if (this.role === 'assistant') {
      this.assistants = false;
    } else if (this.role === 'student') {
      this.students = false;
    }
  }
  addStudent() {
    this.router.navigate(['addStudent']);
  }
  searchStudent() {
    this.router.navigate(['searchStudent']);
  }
  addTeacher() {
    this.router.navigate(['addTeacher']);
  }
  searchTeacher() {
    this.router.navigate(['searchTeacher']);
  }
  addAssistant() {
    this.router.navigate(['addAssistant']);
  }
  searchAssistant() {
    this.router.navigate(['searchAssistant']);
  }
  addClass() {
    this.router.navigate(['addClass']);
  }
  searchClass() {
    this.router.navigate(['searchClass']);
  }
  markAttendence_() {
    this.router.navigate(['markAttendence']);
  }
  generate() {
    this.router.navigate(['generateReports']);
  }
}
