import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from 'src/app/services/class.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-view-profile-teacher',
  templateUrl: './view-profile-teacher.component.html',
  styleUrls: ['./view-profile-teacher.component.scss']
})
export class ViewProfileTeacherComponent implements OnInit {
  role = '';
  profile_pic = 'people-avatar-1.jpg';
  teacherDetails: any;
  classes = [];
  /* data tabel for classes */
  rows = [];
  columns = [
    { prop: 'subject_id', name: 'Subject' },
    { prop: 'batch_id', name: 'Batch' },
    { prop: 'group_id', name: 'Group' },
    { prop: 'day_of_week', name: 'Day' },
    { prop: 'starting_time', name: 'Time' },
    { prop: 'fees', name: 'Fees' }
  ];
  selected = [];
  /*************/
  // tslint:disable-next-line:max-line-length
  constructor(private auth: AuthService, private alertService: AlertService, private modalService: NgbModal, private classSer: ClassService) { }

  ngOnInit() {
    this.teacherDetails = this.auth.getTeacher();
    this.getClasses();
  }
  selectClass({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  getClasses() {
    this.classes = [];
    this.selected = [];
    this.classSer.getClassesOfTeacher(this.teacherDetails['teacher_id']).subscribe(success => {
      for (let i = 0; i < success['data'].length; i++) {
        this.classes.push(success['data'][i]);
      }
      this.rows = this.classes;
    }, error => {
      console.log(error);
    });
  }
  editTeacher() {
    this.auth.editTeacher(this.teacherDetails).subscribe(success => {
      console.log(success);
      this.alertService.success('Details Updated Successfully');
    }, error => {
      console.log(error);
      this.alertService.danger('Error Updating Details');
    });
  }
}
