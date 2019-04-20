import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.scss']
})
export class SearchStudentComponent implements OnInit {
  searchTxt = '';
  allstudents = [];
  /* data tabel for classes */
  rows = [];
  columns = [
    { prop: 'student_id', name: 'Student ID' },
    { prop: 'first_name', name: 'First Name' },
    { prop: 'last_name', name: 'Last Name' },
    { prop: 'admission_batch', name: 'Admission Batch' },
    { prop: 'current_batch', name: 'Current Batch' }
  ];
  selected = [];
  /*************/
  student: any;
  constructor(private auth: AuthService, private alertService: AlertService) { }

  ngOnInit() {
    this.getallstudents();
  }
  selectStudent(t) {
    this.student = t.selected[0];
  }
  getallstudents() {
    this.allstudents = [];
    this.auth.getStudents().subscribe(success => {
      this.rows = success['data'];
      this.allstudents = success['data'];
    }, error => {
      console.log(error);
    });
  }
  search() {
    this.searchTxt.split(' ').join('');
    this.searchTxt.toLowerCase();
    if (this.searchTxt === '') {
      this.getallstudents();
    } else {
      this.rows = [];
      for (let i = 0; i < this.allstudents.length; i++) {
        if (((this.allstudents[i]['first_name']).toLowerCase()).includes(this.searchTxt)) {
          this.rows.push(this.allstudents[i]);
        } else if (((this.allstudents[i]['last_name']).toLowerCase()).includes(this.searchTxt)) {
          this.rows.push(this.allstudents[i]);
        } else if (((this.allstudents[i]['student_id']).toLowerCase()).includes(this.searchTxt)) {
          this.rows.push(this.allstudents[i]);
        }
      }
    }
  }
  viewProfile() {
    if (this.selected.length !== 0) {
      this.auth.getStudentProfile(this.selected[0]['student_id']).subscribe(success => {
        console.log(success);
      }, error => {
        console.log(error);
      });
    } else {
      this.alertService.warning('Please Select a Student');
    }
  }
}
