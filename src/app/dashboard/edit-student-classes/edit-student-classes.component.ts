import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'ngx-alerts';
import { ClassService } from 'src/app/services/class.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-edit-student-classes',
  templateUrl: './edit-student-classes.component.html',
  styleUrls: ['./edit-student-classes.component.scss']
})
export class EditStudentClassesComponent implements OnInit {
  searchTxt = '';
  selectedValue = 'bySub';
  role = '';
  classes = [];
  profile_pic = 'edit-student-profile.png';
  allClassesWorking = [];
  /* data tabel for classes working*/
  rows = [];
  rows_ = [];
  columns_ = [
    { prop: 'subject_id', name: 'Subject' },
    { prop: 'batch_id', name: 'Batch' },
    { prop: 'teacher_id', name: 'Teacher' },
    { prop: 'day_of_week', name: 'Day' },
    { prop: 'starting_time', name: 'Time' },
    { prop: 'fees', name: 'Fees' },
    { prop: '_id', name: 'Class ID' }
  ];
  columns = [
    { prop: 'class_id', name: 'class_id' },
    { prop: 'status', name: 'Status' },
  ];
  selected = [];
  selected_ = [];
  student_: any;
  constructor(private modalService: NgbModal,
    private auth: AuthService,
    private alertService: AlertService,
    private classSer: ClassService, private spinnerService: Ng4LoadingSpinnerService) {
    // this.spinnerService.show(); this.spinnerService.hide();
  }

  ngOnInit() {
    this.student_ = JSON.parse(localStorage.getItem('student'));
    console.log(this.student_);
    this.getClasses();
  }
  selectClass({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  selectClassNotIn({ selected }) {
    this.selected_.splice(0, this.selected_.length);
    this.selected_.push(...selected);
  }
  getClasses() {
    this.allClassesWorking = [];
    this.selected = [];
    this.classSer.getClassesOfStudent(this.student_['student_id']).subscribe(success => {
      for (let i = 0; i < success['data'].length; i++) {
        this.allClassesWorking.push(success['data'][i]);
      }
      this.rows = this.allClassesWorking;
      this.getClassesNotIn();
      console.log(this.rows);
    }, error => {
      console.log(error);
    });
  }
  getClassesNotIn() {
    this.classes = [];
    this.selected_ = [];
    this.classSer.getClasses().subscribe(success => {
      for (let i = 0; i < success['data'].length; i++) {
        for (let j = 0; j < this.allClassesWorking.length; j++) {
          if (this.allClassesWorking[j]['class_id'] === success['data'][i]['_id']) {
            break;
          } else if (j === (this.allClassesWorking.length - 1)) {
            this.classes.push(success['data'][i]);
          }
        }
      }
      this.rows_ = this.classes;
      console.log(this.classes);
    }, error => {
      console.log(error);
    });
  }
  search() {
    if (this.searchTxt !== '') {
      this.classes = [];
      this.selected = [];
      this.rows_ = [];
      if (this.selectedValue === 'bySub') {
        this.classSer.getClassesBySubject(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            for (let j = 0; j < this.allClassesWorking.length; j++) {
              if (this.allClassesWorking[j]['class_id'] === success['data'][i]['_id']) {
                break;
              } else if (j === (this.allClassesWorking.length - 1)) {
                this.classes.push(success['data'][i]);
              }
            }
          }
          this.rows_ = this.classes;
        }, error => {
          console.log(error);
        });
      } else if (this.selectedValue === 'byTeacher') {
        this.classSer.getClassesByTeacher(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            for (let j = 0; j < this.allClassesWorking.length; j++) {
              if (this.allClassesWorking[j]['class_id'] === success['data'][i]['_id']) {
                break;
              } else if (j === (this.allClassesWorking.length - 1)) {
                this.classes.push(success['data'][i]);
              }
            }
          }
          this.rows_ = this.classes;
        }, error => {
          console.log(error);
        });
      } else if (this.selectedValue === 'byBatch') {
        this.classSer.getClassesByBatch(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            for (let j = 0; j < this.allClassesWorking.length; j++) {
              if (this.allClassesWorking[j]['class_id'] === success['data'][i]['_id']) {
                break;
              } else if (j === (this.allClassesWorking.length - 1)) {
                this.classes.push(success['data'][i]);
              }
            }
          }
          this.rows_ = this.classes;
        }, error => {
          console.log(error);
        });
      } else {
        this.getClassesNotIn();
      }
    } else {
      this.getClassesNotIn();
    }
  }
  unenrollClass() {
    if (this.selected.length > 0) {
      this.spinnerService.show();
      this.classSer.deassignStudent(this.student_['student_id'], this.selected).subscribe(success => {
        console.log(success);
        this.selected = [];
        this.getClasses();
        this.getClassesNotIn();
        this.spinnerService.hide();
        this.alertService.success('Student Deassigend Successfully');
      }, error => {
        console.log(error);
        this.selected = [];
        this.spinnerService.hide();
        this.alertService.danger('Error While Deassigning Student');
      });
    } else {
      this.alertService.warning('Please Select a Class to Deassign');
    }
  }
  enroll() {
    if (this.selected_.length > 0) {
      this.spinnerService.show();
      this.classSer.assignStudent(this.student_['student_id'], this.selected_).subscribe(success => {
        console.log(success);
        this.selected_ = [];
        this.getClasses();
        this.getClassesNotIn();
        this.spinnerService.hide();
        this.alertService.success('Student Assigend Successfully');
      }, error => {
        console.log(error);
        this.selected_ = [];
        this.spinnerService.hide();
        this.alertService.danger('Error While Assigning Student');
      });
    } else {
      this.alertService.warning('Please Select a Class to Aassign');
    }
  }

}
