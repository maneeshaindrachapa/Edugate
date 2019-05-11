import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.scss']
})
export class SearchTeacherComponent implements OnInit {
  searchTxt = '';
  allTeachers = [];
  role = '';
  student = true;
  /* data tabel for classes */
  rows = [];
  columns = [
    { prop: 'teacher_id', name: 'Teacher ID' },
    { prop: 'first_name', name: 'First Name' },
    { prop: 'last_name', name: 'Last Name' },
    { prop: 'email', name: 'Email' },
    { prop: 'telephone.mobile', name: 'Mobile No' }
  ];
  selected = [];
  /*************/
  teacher: any;
  teacher_ = { teacher_id: '', first_name: '', last_name: '' };
  constructor(private modalService: NgbModal, private auth: AuthService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    if (this.role === 'student') {
      this.student = false;
    }
    this.allTeachers = [];
    this.auth.getTeachers().subscribe(success => {
      this.rows = success['data'];
      this.allTeachers = success['data'];
    }, error => {
      console.log(error);
    });
  }
  selectTeacher(t) {
    this.teacher = t.selected[0];
    this.teacher_.teacher_id = this.teacher['teacher_id'];
    this.teacher_.first_name = this.teacher['first_name'];
    this.teacher_.last_name = this.teacher['last_name'];
  }
  deleteProfile(content) {
    if (this.teacher != null) {
      this.modalService.open(content);
    } else {
      this.alertService.warning('Please Select a Teacher');
    }
  }
  getallteachers() {
    this.allTeachers = [];
    this.auth.getTeachers().subscribe(success => {
      this.rows = success['data'];
      this.allTeachers = success['data'];
    }, error => {
      console.log(error);
    });
  }
  deleteTeacher() {
    this.auth.deleteTeacher(this.teacher_.teacher_id).subscribe(success => {
      this.getallteachers();
      this.alertService.success('Successfully Deleted');
      this.teacher = null;
      this.modalService.dismissAll();
    }, error => {
      this.alertService.danger('Error in Server');
      this.modalService.dismissAll();
    });
  }
  viewProfile() {
    if (this.selected.length !== 0) {
      this.auth.getTeacherProfile(this.selected[0]['teacher_id']).subscribe(success => {
        localStorage.setItem('teacher', JSON.stringify(success['data']));
        this.router.navigate(['viewProfileTeacher']);
      }, error => {
        console.log(error);
      });
    } else {
      this.alertService.warning('Please Select a Student');
    }
  }
  search() {
    this.searchTxt.split(' ').join('');
    this.searchTxt.toLowerCase();
    if (this.searchTxt === '') {
      this.getallteachers();
    } else {
      this.rows = [];
      for (let i = 0; i < this.allTeachers.length; i++) {
        if (((this.allTeachers[i]['first_name']).toLowerCase()).includes(this.searchTxt)) {
          this.rows.push(this.allTeachers[i]);
        } else if (((this.allTeachers[i]['last_name']).toLowerCase()).includes(this.searchTxt)) {
          this.rows.push(this.allTeachers[i]);
        } else if (((this.allTeachers[i]['teacher_id']).toLowerCase()).includes(this.searchTxt)) {
          this.rows.push(this.allTeachers[i]);
        }
      }
    }
  }

}
