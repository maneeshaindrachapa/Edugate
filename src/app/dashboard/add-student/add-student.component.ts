import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  selectedValue = 'bySub';
  searchTxt = '';
  username = '';
  role = '';
  profile_pic = 'add-student-avatar.jpg'; // default prof pic
  classes = [];
  batches = [];
  admissionDate = '';
  classes_ = [];
  /* data tabel for classes */
  rows = [];
  rows_ = [];
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
  selected_ = [];
  selected__ = [];
  /*************/

  personalInfo = { firstName: '', lastName: '', address: '', city: '', telephone: '', mobilePhone: false, birthday: new Date(), email: '' };
  guardinaInfo = { name: '', address: '', city: '', telephone: '', emergency: '' };
  batchDetails = '';
  // tslint:disable-next-line:max-line-length
  constructor(private classSer: ClassService, config: NgbModalConfig, private modalService: NgbModal, private alertService: AlertService, private auth: AuthService) { }

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
  removeClass() {
    if (this.selected_.length > 0) {
      for (let i = 0; i < this.rows_.length; i++) {
        if (this.rows_[i]['_id'] === this.selected__['_id']) {
          this.rows_.splice(i, 1);
          this.selected__ = [];
          break;
        }
      }
    } else {
      this.alertService.warning('Please Select a Class to Remove');
    }
  }
  addClasses() {
    if (this.rows_.length > 0) {
      let t = true;
      for (let i = 0; i < this.selected.length; i++) {
        for (let j = 0; j < this.rows_.length; j++) {
          if (this.rows_[j]['subject_id'] === this.selected[i]['subject_id']) {
            t = false;
            break;
          }
        }
        if (t) {
          this.classes_.push(this.selected[i]);
        }
      }
    } else {
      for (let i = 0; i < this.selected.length; i++) {
        this.classes_.push(this.selected[i]);
      }
    }
    this.rows_ = [];
    for (let i = 0; i < this.classes_.length; i++) {
      this.rows_.push(this.classes_[i]);
    }
    this.modalService.dismissAll();
  }

  addStudent() {
    this.auth.addStudent(this.personalInfo, this.guardinaInfo, this.batchDetails, this.rows_)
      .subscribe(success => {
        this.alertService.success('Student Added Successfully');
      }, error => {
        console.log(error);
        this.alertService.danger(error['error']['message']);
      });
  }
  selectClass({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  selectClassAdded(t) {
    this.selected__ = t.selected[0];
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
      console.log(this.classes);
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
  search() {
    console.log(this.selectedValue);
    if (this.searchTxt !== '') {
      this.classes = [];
      this.selected = [];
      this.rows = [];
      if (this.selectedValue === 'bySub') {
        this.classSer.getClassesBySubject(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            this.classes.push(success['data'][i]);
          }
          this.rows = this.classes;
        }, error => {
          console.log(error);
        });
      } else if (this.selectedValue === 'byTeacher') {
        this.classSer.getClassesByTeacher(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            this.classes.push(success['data'][i]);
          }
          this.rows = this.classes;
        }, error => {
          console.log(error);
        });
      } else if (this.selectedValue === 'byBatch') {
        this.classSer.getClassesByBatch(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            this.classes.push(success['data'][i]);
          }
          this.rows = this.classes;
        }, error => {
          console.log(error);
        });
      }
    } else {
      this.getClasses();
    }
  }
}
