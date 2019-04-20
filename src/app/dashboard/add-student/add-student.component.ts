import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  username = '';
  role = '';
  profile_pic = 'add-student-avatar.jpg'; // default prof pic
  classes = [];
  batches = [];
  admissionDate = '';
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

  personalInfo = { firstName: '', lastName: '', address: '', city: '', telephone: '', mobilePhone: '', birthday: '' };
  guardinaInfo = { name: '', address: '', city: '', telephone: '', emergency: '' };
  batchDetails = '';
  // tslint:disable-next-line:max-line-length
  constructor(private classSer: ClassService, config: NgbModalConfig, private modalService: NgbModal, private alertService: AlertService) { }

  ngOnInit() {
  }
  open(content) {
    this.modalService.open(content);
    this.getClasses();
  }
  openBatch(content) {
    this.modalService.open(content);
    this.getBatch();
  }
  addStudent() {
    console.log(this.personalInfo);
    console.log(this.guardinaInfo);
  }
  selectClass({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  /* guardian details select same*/
  sameAddress() {
    if (this.personalInfo.address !== '') {
      this.guardinaInfo.address = this.personalInfo.address;
    } else {
      this.alertService.danger('Please Select a Address in Personal Information');
    }
  }
  sameCity() {
    if (this.personalInfo.city !== '') {
      this.guardinaInfo.city = this.personalInfo.city;
    } else {
      this.alertService.danger('Please Select a City in Personal Information');
    }
  }
  sameTelephone() {
    if (this.personalInfo.telephone !== '') {
      this.guardinaInfo.telephone = this.personalInfo.telephone;
    } else {
      this.alertService.danger('Please Select a Telephone in Personal Information');
    }
  }
  sameEmergency() {
    if (this.guardinaInfo.telephone !== '') {
      this.guardinaInfo.emergency = this.guardinaInfo.telephone;
    } else {
      this.alertService.danger('Please Select a Telephone in Guardian Information');
    }
  }
  /******************************/

  getClasses() {
    this.classes = [];
    this.selected = [];
    this.classSer.getClasses().subscribe(success => {
      for (let i = 0; i < success['data'].length; i++) {
        this.classes.push(success['data'][i]);
      }
      this.rows = this.classes;
    }, error => {
      console.log(error);
    });
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
}
