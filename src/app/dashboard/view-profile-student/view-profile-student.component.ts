import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from 'src/app/services/class.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-view-profile-student',
  templateUrl: './view-profile-student.component.html',
  styleUrls: ['./view-profile-student.component.scss']
})
export class ViewProfileStudentComponent implements OnInit {
  username = '';
  role = '';
  profile_pic = 'edit-student-profile.png';
  studentDetails: any;
  classes = [];
  batches = [];
  /* data tabel for classes */
  rows = [];
  columns = [
    { prop: 'subject_id', name: 'Subject' },
    { prop: 'batch_id', name: 'Batch' },
    { prop: 'teacher_id', name: 'Teacher' },
    { prop: 'group_id', name: 'Group' },
    { prop: 'day_of_week', name: 'Day' },
    { prop: 'starting_time', name: 'Time' },
    { prop: 'fees', name: 'Fees' }
  ];
  selected = [];
  /*************/
  constructor(private auth: AuthService, private modalService: NgbModal, private classSer: ClassService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.studentDetails = JSON.parse(localStorage.getItem('student'));
    console.log(this.studentDetails);
  }
  selectClass({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  open(content) {
    this.modalService.open(content);
    this.getClasses();
  }
  getClasses() {
    this.classes = [];
    this.selected = [];
    this.classSer.getClassesOfStudent(this.studentDetails['student_id']).subscribe(success => {
      for (let i = 0; i < success['data'].length; i++) {
        this.classes.push(success['data'][i]);
      }
      this.rows = this.classes;
    }, error => {
      console.log(error);
    });
  }
  openBatch(content) {
    this.modalService.open(content);
    this.getBatch();
  }
  getBatch() {
    this.batches = [];
    this.classSer.getBatches().subscribe(data => {
      for (let i = 0; i < data['data'].length; i++) {
        this.batches.push(data['data'][i]);
      }
      console.log(this.batches);
    }, error => {
      console.log(error);
    });
  }
  UpdateStudent() {
    console.log(this.studentDetails);
    this.auth.updateStudent(this.studentDetails).subscribe(success => {
      console.log(success);
      this.alertService.success('Update Student Details Successfully');
    }, error => {
      console.log(error);
      this.alertService.danger('Error Update Student Details');
    });
  }

}
