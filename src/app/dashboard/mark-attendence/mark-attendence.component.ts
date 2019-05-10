import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mark-attendence',
  templateUrl: './mark-attendence.component.html',
  styleUrls: ['./mark-attendence.component.scss']
})
export class MarkAttendenceComponent implements OnInit {
  results: any[] = [];
  selected: any;
  queryField: FormControl = new FormControl();

  allstudents = [];
  student: any;
  constructor( private modalService: NgbModal, private auth: AuthService, private alertService: AlertService) { }

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
      console.log(this.results);
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
    this.queryField = new FormControl(result['first_name'] + ' ' + result['last_name']);
    this.results = [];
  }
  mark() {
    if (this.selected !== null) {

    } else {
      this.alertService.danger('Please Select a Student to Mark');
    }
  }

}
