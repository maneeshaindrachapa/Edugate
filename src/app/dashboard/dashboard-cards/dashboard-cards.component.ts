import { Component, OnInit } from '@angular/core';

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
  constructor() {
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

}
