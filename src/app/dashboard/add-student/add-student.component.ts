import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  username = '';
  role = '';
  profile_pic = 'add-student-avatar.jpg'; // default prof pic
  classes: classesparticipate;
  batches = [];

  personalInfo = { firstName: '', lastName: '', address: '', city: '', telephone: '', mobilePhone: '', birthday: '' };
  guardinaInfo = { name: '', address: '', city: '', telephone: '', emergency: '' };
  batchDetails = '';
  constructor(private classSer: ClassService, config: NgbModalConfig, private modalService: NgbModal) { }

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
  sameAddress() {
    if (this.personalInfo.address !== '') {
      this.guardinaInfo.address = this.personalInfo.address;
    } else {
      alert('error');
    }
  }
  sameCity() {
    if (this.personalInfo.city !== '') {
      this.guardinaInfo.city = this.personalInfo.city;
    } else {
      alert('error');
    }
  }
  sameTelephone() {
    if (this.personalInfo.telephone !== '') {
      this.guardinaInfo.telephone = this.personalInfo.telephone;
    } else {
      alert('error');
    }
  }
  sameEmergency() {
    if (this.guardinaInfo.telephone !== '') {
      this.guardinaInfo.emergency = this.guardinaInfo.telephone;
    } else {
      alert('error');
    }
  }

  getClasses() {
    this.classSer.getClasses().subscribe(success => {
      console.log(success);
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

// tslint:disable-next-line:class-name
interface classesparticipate {
  // tslint:disable-next-line:semicolon
  class_id: Number,
  // tslint:disable-next-line:semicolon
  fees_rate: Number
  // tslint:disable-next-line:eofline
}