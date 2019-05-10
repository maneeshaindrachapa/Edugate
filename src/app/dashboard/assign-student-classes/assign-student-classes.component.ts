import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'ngx-alerts';
import { ClassService } from 'src/app/services/class.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-assign-student-classes',
  templateUrl: './assign-student-classes.component.html',
  styleUrls: ['./assign-student-classes.component.scss']
})
export class AssignStudentClassesComponent implements OnInit {
  searchTxt = '';
  selectedValue = 'bySub';
  role = '';
  students = [];
  profile_pic = 'add-class-avatar.png';
  allStudentsEnrolled = [];
  /* data tabel for students*/
  rows = [];
  rows_ = [];
  columns_ = [
    { prop: 'student_id', name: 'Student ID' },
    { prop: 'first_name', name: 'First Name' },
    { prop: 'last_name', name: 'Last Name' },
    { prop: 'admission_batch', name: 'Admission Batch' },
    { prop: 'current_batch', name: 'Current Batch' }
  ];
  columns = [
    { prop: 'student_id', name: 'Student ID' },
    { prop: 'first_name', name: 'First Name' },
    { prop: 'last_name', name: 'Last Name' },
    { prop: 'admission_batch', name: 'Admission Batch' },
    { prop: 'current_batch', name: 'Current Batch' }
  ];
  selected = [];
  selected_ = [];
  class_: any;
  constructor(private modalService: NgbModal,
    private auth: AuthService,
    private alertService: AlertService,
    private classSer: ClassService, private spinnerService: Ng4LoadingSpinnerService) {
    // this.spinnerService.show(); this.spinnerService.hide();
  }

  ngOnInit() {
    this.class_ = JSON.parse(localStorage.getItem('class'));
    console.log(this.class_);
    this.getStudents();
  }
  selectClass({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  selectClassNotIn({ selected }) {
    this.selected_.splice(0, this.selected_.length);
    this.selected_.push(...selected);
  }
  getStudents() {
    this.allStudentsEnrolled = [];
    this.selected = [];
    this.auth.getStudents().subscribe(success => {
      for (let i = 0; i < success['data'].length; i++) {
        this.allStudentsEnrolled.push(success['data'][i]);
      }
      this.rows = this.allStudentsEnrolled;
      this.getstudentsNotIn();
      console.log(this.rows);
    }, error => {
      console.log(error);
    });
  }
  getstudentsNotIn() {
    this.students = [];
    this.selected_ = [];
    this.auth.getStudents().subscribe(success => {
      for (let i = 0; i < success['data'].length; i++) {
        for (let j = 0; j < this.allStudentsEnrolled.length; j++) {
          if (this.allStudentsEnrolled[j]['student_id'] === success['data'][i]['student_id']) {
            break;
          } else if (j === (this.allStudentsEnrolled.length - 1)) {
            this.students.push(success['data'][i]);
          }
        }
      }
      this.rows_ = this.students;
      console.log(this.students);
    }, error => {
      console.log(error);
    });
  }
  // search() {
  //   if (this.searchTxt !== '') {
  //     this.students = [];
  //     this.selected = [];
  //     this.rows_ = [];
  //     if (this.selectedValue === 'bySub') {
  //       this.classSer.getstudentsBySubject(this.searchTxt).subscribe(success => {
  //         for (let i = 0; i < success['data'].length; i++) {
  //           for (let j = 0; j < this.allStudentsEnrolled.length; j++) {
  //             if (this.allStudentsEnrolled[j]['class_id'] === success['data'][i]['_id']) {
  //               break;
  //             } else if (j === (this.allStudentsEnrolled.length - 1)) {
  //               this.students.push(success['data'][i]);
  //             }
  //           }
  //         }
  //         this.rows_ = this.students;
  //       }, error => {
  //         console.log(error);
  //       });
  //     } else if (this.selectedValue === 'byTeacher') {
  //       this.classSer.getstudentsByTeacher(this.searchTxt).subscribe(success => {
  //         for (let i = 0; i < success['data'].length; i++) {
  //           for (let j = 0; j < this.allStudentsEnrolled.length; j++) {
  //             if (this.allStudentsEnrolled[j]['class_id'] === success['data'][i]['_id']) {
  //               break;
  //             } else if (j === (this.allStudentsEnrolled.length - 1)) {
  //               this.students.push(success['data'][i]);
  //             }
  //           }
  //         }
  //         this.rows_ = this.students;
  //       }, error => {
  //         console.log(error);
  //       });
  //     } else if (this.selectedValue === 'byBatch') {
  //       this.classSer.getstudentsByBatch(this.searchTxt).subscribe(success => {
  //         for (let i = 0; i < success['data'].length; i++) {
  //           for (let j = 0; j < this.allStudentsEnrolled.length; j++) {
  //             if (this.allStudentsEnrolled[j]['class_id'] === success['data'][i]['_id']) {
  //               break;
  //             } else if (j === (this.allStudentsEnrolled.length - 1)) {
  //               this.students.push(success['data'][i]);
  //             }
  //           }
  //         }
  //         this.rows_ = this.students;
  //       }, error => {
  //         console.log(error);
  //       });
  //     } else {
  //       this.getstudentsNotIn();
  //     }
  //   } else {
  //     this.getstudentsNotIn();
  //   }
  // }
  // unenrollClass() {
  //   if (this.selected.length > 0) {
  //     this.spinnerService.show();
  //     this.classSer.deassignStudent(this.class_['class_id'], this.selected).subscribe(success => {
  //       console.log(success);
  //       this.selected = [];
  //       this.getStudents();
  //       this.getstudentsNotIn();
  //       this.spinnerService.hide();
  //       this.alertService.success('Student Deassigend Successfully');
  //     }, error => {
  //       console.log(error);
  //       this.selected = [];
  //       this.spinnerService.hide();
  //       this.alertService.danger('Error While Deassigning Student');
  //     });
  //   } else {
  //     this.alertService.warning('Please Select a Class to Deassign');
  //   }
  // }
  // enroll() {
  //   if (this.selected_.length > 0) {
  //     this.spinnerService.show();
  //     this.classSer.assignStudent(this.class_['class_id'], this.selected_).subscribe(success => {
  //       console.log(success);
  //       this.selected_ = [];
  //       this.getStudents();
  //       this.getstudentsNotIn();
  //       this.spinnerService.hide();
  //       this.alertService.success('Student Assigend Successfully');
  //     }, error => {
  //       console.log(error);
  //       this.selected_ = [];
  //       this.spinnerService.hide();
  //       this.alertService.danger('Error While Assigning Student');
  //     });
  //   } else {
  //     this.alertService.warning('Please Select a Class to Aassign');
  //   }
  // }
}
