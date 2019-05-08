import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'ngx-alerts';
import { ClassService } from 'src/app/services/class.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-view-classes-assistant',
  templateUrl: './view-classes-assistant.component.html',
  styleUrls: ['./view-classes-assistant.component.scss']
})
export class ViewClassesAssistantComponent implements OnInit {
  searchTxt = '';
  selectedValue = 'bySub';
  role = '';
  classes = [];
  profile_pic = 'people-avatar-1.jpg';
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
  assistant: any;
  constructor(private modalService: NgbModal,
    private auth: AuthService,
    private alertService: AlertService,
    private classSer: ClassService, private spinnerService: Ng4LoadingSpinnerService) {
    // this.spinnerService.show(); this.spinnerService.hide();
  }

  ngOnInit() {
    this.assistant = this.auth.getAssistant();
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
    this.classSer.getClassesOfAssistant(this.assistant['assistant_id']).subscribe(success => {
      for (let i = 0; i < success['data'].length; i++) {
        this.allClassesWorking.push(success['data'][i]);
      }
      this.rows = this.allClassesWorking;
      this.getClassesNotIn();
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
    console.log(this.selectedValue);
    if (this.searchTxt !== '') {
      this.classes = [];
      this.selected = [];
      this.rows_ = [];
      if (this.selectedValue === 'bySub') {
        this.classSer.getClassesBySubject(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            this.classes.push(success['data'][i]);
          }
          this.rows_ = this.classes;
        }, error => {
          console.log(error);
        });
      } else if (this.selectedValue === 'byTeacher') {
        this.classSer.getClassesByTeacher(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            this.classes.push(success['data'][i]);
          }
          this.rows_ = this.classes;
        }, error => {
          console.log(error);
        });
      } else if (this.selectedValue === 'byBatch') {
        this.classSer.getClassesByBatch(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            this.classes.push(success['data'][i]);
          }
          this.rows_ = this.classes;
        }, error => {
          console.log(error);
        });
      }
    } else {
      this.getClassesNotIn();
    }
  }
  deassignClass() {
    if (this.selected.length > 0) {
      this.spinnerService.show();
      this.classSer.deassignAssistant(this.assistant['assistant_id'], this.selected).subscribe(success => {
        console.log(success);
        this.selected = [];
        this.getClasses();
        this.getClassesNotIn();
        this.spinnerService.hide();
        this.alertService.success('Assistant Deassigend Successfully');
      }, error => {
        console.log(error);
        this.selected = [];
        this.spinnerService.hide();
        this.alertService.danger('Error While Deassigning Assistant');
      });
    } else {
      this.alertService.warning('Please Select a Class to Deassign');
    }
  }
  assignAssistant() {
    if (this.selected_.length > 0) {
      this.spinnerService.show();
      this.classSer.assignAssistant(this.assistant['assistant_id'], this.selected_).subscribe(success => {
        console.log(success);
        this.selected_ = [];
        this.getClasses();
        this.getClassesNotIn();
        this.spinnerService.hide();
        this.alertService.success('Assistant Assigend Successfully');
      }, error => {
        console.log(error);
        this.selected_ = [];
        this.spinnerService.hide();
        this.alertService.danger('Error While Assigning Assistant');
      });
    } else {
      this.alertService.warning('Please Select a Class to Aassign');
    }
  }
}
