import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  username = '';
  role = '';
  profile_pic = 'add-student-avatar.jpg'; // default prof pic

  personalInfo = { firstName: '', lastName: '', address: '', city: '', telephone: '', mobilePhone: '', birthday: '' };
  guardinaInfo = { name: '', address: '', city: '', telephone: '', emergency: '' };
  constructor() { }

  ngOnInit() {
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
}
