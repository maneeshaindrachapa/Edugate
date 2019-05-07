import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
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
}
