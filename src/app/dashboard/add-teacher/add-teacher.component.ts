import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  role = '';
  profile_pic = 'add-teacher-avatar.png';
  personalInfo = {
    firstName: '',
    lastName: '',
    address: '', city: '',
    telephone: '',
    mobilePhone: '',
    birthday: '', nic: '',
    admissiondate: ''
  };

  constructor(private modalService: NgbModal, private alertService: AlertService, private auth: AuthService) { }

  ngOnInit() {
  }
  addTeacher() {
    if (this.personalInfo.firstName !== ''
      && this.personalInfo.lastName !== '' &&
      this.personalInfo.address !== '' &&
      this.personalInfo.city !== '' &&
      this.personalInfo.telephone !== '' &&
      this.personalInfo.birthday !== '' &&
      this.personalInfo.nic !== '' &&
      this.personalInfo.admissiondate !== '') {
      this.auth.addTeacher(this.personalInfo).subscribe(success => {
        console.log(success);
        this.alertService.success('Teacher Added Successfully');
      }, error => {
        this.alertService.danger('Error adding Teacher');
        console.log(error);
      });
    } else {
      this.alertService.danger('Fill All the Data');
    }
  }
}
