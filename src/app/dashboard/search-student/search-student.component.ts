import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  student_ = { student_id: '', first_name: '', last_name: '' };
  constructor(private modalService: NgbModal, private auth: AuthService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.allstudents = [];
    this.auth.getStudents().subscribe(success => {
      this.rows = success['data'];
      this.allstudents = success['data'];
    }, error => {
      console.log(error);
    });
  }
  deleteProfile(content) {
    if (this.student != null) {
      this.modalService.open(content);
    } else {
      this.alertService.warning('Please Select a Student');
    }
  }
  selectStudent(t) {
    this.student = t.selected[0];
    this.student_.student_id = this.student['student_id'];
    this.student_.first_name = this.student['first_name'];
    this.student_.last_name = this.student['last_name'];
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
  deleteStudent() {
    this.auth.deleteStudent(this.student_.student_id).subscribe(success => {
      this.getallstudents();
      this.alertService.success('Successfully Deleted');
      this.modalService.dismissAll();
    }, error => {
      this.alertService.danger('Error in Server');
      this.modalService.dismissAll();
    });
  }
  viewProfile() {
    if (this.selected.length !== 0) {
      this.auth.getStudentProfile(this.selected[0]['student_id']).subscribe(success => {
        this.auth.setStudent(success['data']);
        this.router.navigate(['viewProfileStudent']);
      }, error => {
        console.log(error);
      });
    } else {
      this.alertService.warning('Please Select a Student');
    }
  }
}
