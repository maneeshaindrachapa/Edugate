import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from 'src/app/services/class.service';
import { AttendenceService } from 'src/app/services/attendence.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { inherits } from 'util';

@Component({
  selector: 'app-mark-attendence',
  templateUrl: './mark-attendence.component.html',
  styleUrls: ['./mark-attendence.component.scss']
})
export class MarkAttendenceComponent implements OnInit {
  results: any[] = [];
  selected: any;
  queryField: FormControl = new FormControl();
  student_id = '';
  student_info = [];
  classAttendence = [];
  tfArray = [];
  tfArray_ = [];
  thisMonth = [];
  lastMonth = [];
  payFor = 'Last Month';
  fees = 0;
  fullHalf = 'full';
  class_id_ = 0;

  allstudents = [];
  student: any;
  constructor(private modalService: NgbModal, private classSer: ClassService
    , private auth: AuthService, private alertService: AlertService, private attSer: AttendenceService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getallstudents();
    this.queryField.valueChanges.subscribe(result => {
      this.results = [];
      for (let i = 0; i < this.allstudents.length; i++) {
        if (((this.allstudents[i]['first_name']).toLowerCase()).includes(result)) {
          this.results.push(this.allstudents[i]);
        } else if (((this.allstudents[i]['last_name']).toLowerCase()).includes(result)) {
          this.results.push(this.allstudents[i]);
        } else if (((this.allstudents[i]['student_id']).toLowerCase()).includes(result)) {
          this.results.push(this.allstudents[i]);
        }
      }
    });
  }
  changeAmount() {
    if (this.fullHalf === 'half') {
      this.fees = this.fees / 2;
    } else {
      this.fees = this.fees * 2;
    }
  }
  open1(content, id, fee) {
    this.fees = fee;
    this.class_id_ = id;
    this.payFor = 'This Month';
    this.modalService.open(content);
  }
  open2(content, id, fee) {
    this.fees = fee;
    this.class_id_ = id;
    this.payFor = 'Last Month';
    this.modalService.open(content);
  }
  topUp() {
    this.attSer.top_up(this.student_id, this.class_id_, this.payFor, this.fees).subscribe(success => {
      this.alertService.success('Top Up Paid for ' + this.payFor + ' successfully');
      this.modalService.dismissAll();
    }, error => {
      console.log(error);
      this.alertService.danger('Error While Top Up');
      this.modalService.dismissAll();
    });
  }
  getallstudents() {
    this.allstudents = [];
    this.auth.getStudents().subscribe(success => {
      this.allstudents = success['data'];
    }, error => {
      console.log(error);
    });
  }
  markAttendence(result) {
    this.selected = result;
    this.student_id = result['student_id'];
    this.mark(result['student_id']);
    this.results = [];
  }
  mark(student_id) {
    this.spinnerService.show();
    if (this.selected !== null) {
      this.attSer.getStudentAttendence(student_id).subscribe(success => {
        this.student_info = success['data']['student_info'];
        this.classAttendence = success['data']['class_attendance_info'];
        let tf = [];
        let tf_ = [];
        for (let j = 0; j < this.classAttendence.length; j++) {
          if (this.classAttendence[j]['current_paid']) {
            this.thisMonth.push('#00c851');
          } else {
            this.thisMonth.push('#c00');
          }
          if (this.classAttendence[j]['prev_paid']) {
            this.lastMonth.push('#00c851');
          } else {
            this.lastMonth.push('#c00');
          }
          for (let k = 0; k < this.classAttendence[j]['current_class_dates'].length; k++) {
            for (let l = 0; l < this.classAttendence[j]['current_attended_dates'].length; l++) {
              // tslint:disable-next-line:max-line-length
              if ((new Date(this.classAttendence[j]['current_class_dates'][k]).toISOString()).substr(0, 10) === (new Date(this.classAttendence[j]['current_attended_dates'][l]).toISOString()).substr(0, 10)) {
                tf.push(true);
                break;
              } else if (l === 3) {
                tf.push(false);
              }
            }
          }
          this.tfArray.push(tf);
          tf = [];
        }
        for (let j = 0; j < this.classAttendence.length; j++) {
          for (let k = 0; k < this.classAttendence[j]['prev_class_dates'].length; k++) {
            for (let l = 0; l < this.classAttendence[j]['prev_attended_dates'].length; l++) {
              // tslint:disable-next-line:max-line-length
              if ((new Date(this.classAttendence[j]['prev_class_dates'][k]).toISOString()).substr(0, 10) === (new Date(this.classAttendence[j]['prev_attended_dates'][l]).toISOString()).substr(0, 10)) {
                tf_.push(true);
                break;
              } else if (l === 3) {
                tf_.push(false);
              }
            }
          }
          this.tfArray_.push(tf_);
          tf_ = [];
        }
        if (this.tfArray_.length > 0 && this.tfArray.length > 0) {
          this.spinnerService.hide();
        }
      }, error => {
        console.log(error);
      });
    } else {
      this.alertService.danger('Please Select a Student to Mark');
    }
  }
  markAttendenceStd(class_id, class_day) {
    this.attSer.mark(this.student_id, class_id, class_day).subscribe(success => {
      console.log(success);
      this.alertService.success('Attendence Marked Successfully');
    }, error => {
      console.log(error);
      this.alertService.danger('Error While Marking Attendence');
    });
  }
}
