import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {
  editClass: any;
  batches = []; // get batches
  selectedBatch = '';
  teachers = []; // get teachers
  selectedTeacher = '';
  groups = []; // get groups
  selectedGroup = '';
  subjects = []; // get Subjects
  fees = 1; // fees
  selectDailyFee = 'yes';
  selectedSubject = '';
  endingTime = '';
  startingTime = '';
  startingDate = '';
  role = '';
  profile_pic = 'add-class-avatar.png';

  minYear = new Date().getFullYear();
  batchDetails = { name: '', year: new Date().getFullYear() };
  subjectDetails = { stream: '', subject: '' };
  groupDetails = { category: '', name: '' };
  constructor(private modalService: NgbModal,
    private alertService: AlertService,
    private auth: AuthService,
    private classSer: ClassService) { }

  ngOnInit() {
    this.getBatch();
    this.getTeachers();
    this.getGroups();
    this.getSubjects();
    this.editClass = JSON.parse(localStorage.getItem('class'));
    this.setDetails();
  }
  setDetails() {
    this.selectedBatch = this.editClass['batch_id'];
    this.selectedSubject = this.editClass['subject_id'];
    this.selectedGroup = this.editClass['group_id'];
    this.selectedTeacher = this.editClass['teacher_id'];
    this.startingDate = (new Date(this.editClass['starting_date']).toISOString()).substr(0, 10);
    this.endingTime = this.editClass['ending_time'];
    this.startingTime = this.editClass['starting_time'];
    this.fees = this.editClass['fees'];
    if (this.editClass['daily_fees']) {
      this.selectDailyFee = 'yes';
    } else {
      this.selectDailyFee = 'no';
    }
  }
  getBatch() {
    this.batches = [];
    this.classSer.getBatches().subscribe(data => {
      for (let i = 0; i < data['data'].length; i++) {
        this.batches.push(data['data'][i]);
      }
    }, error => {
      console.log(error);
    });
  }
  getTeachers() {
    this.teachers = [];
    this.auth.getTeachers().subscribe(data => {
      for (let i = 0; i < data['data'].length; i++) {
        this.teachers.push(data['data'][i]);
      }
    }, error => {
      console.log(error);
    });
  }
  getGroups() {
    this.groups = [];
    this.classSer.getGroups().subscribe(data => {
      for (let i = 0; i < data['data'].length; i++) {
        this.groups.push(data['data'][i]);
      }
    }, error => {
      console.log(error);
    });
  }
  getSubjects() {
    this.subjects = [];
    this.classSer.getSubjects().subscribe(data => {
      for (let i = 0; i < data['data'].length; i++) {
        this.subjects.push(data['data'][i]);
      }
    }, error => {
      console.log(error);
    });
  }
  editClass_() {
    if (this.selectedBatch !== '' && this.selectedTeacher !== '' && this.selectedGroup !== '' &&
      this.selectedSubject !== '' && this.endingTime !== '' && this.startingTime !== '') {
      this.classSer.editClass(this.editClass['_id'], this.selectedSubject,
        this.selectedBatch,
        this.selectedGroup,
        this.selectedTeacher,
        this.startingDate,
        this.endingTime,
        this.startingTime,
        this.fees,
        this.selectDailyFee).subscribe(success => {
          this.alertService.success('Class Edited Successfully');
        }, error => {
          if (error['error']['success'] === false) {
            this.alertService.danger(error['error']['message']);
          } else {
            this.alertService.danger('Error Occured While Deleting Class');
          }
        });
    } else {
      this.alertService.warning('Please Fill All The Details');
    }
  }
  open(content) {
    this.modalService.open(content);
  }
  addNewBatch() {
    if (this.batchDetails.year !== null && this.batchDetails.name !== '') {
      if (this.batchDetails.year >= this.minYear) {
        this.classSer.addBatch(this.batchDetails.name, this.batchDetails.year).subscribe(success => {
          this.alertService.success('New Batch Created Successfully');
          console.log(success);
          this.getBatch();
          this.modalService.dismissAll();
        }, error => {
          console.log(error);
          this.alertService.danger('Error Creating New Batch');
        });
      } else {
        this.alertService.warning('Error in Year');
      }
    } else {
      this.alertService.warning('Please Fill Details to add New Batch');
    }
  }
  addNewSubject() {
    if (this.subjectDetails.stream !== '' && this.subjectDetails.subject !== '') {
      this.classSer.addSubject(this.subjectDetails.stream, this.subjectDetails.subject).subscribe(success => {
        this.alertService.success('New Subject Created Successfully');
        console.log(success);
        this.getSubjects();
        this.modalService.dismissAll();
      }, error => {
        console.log(error);
        this.alertService.danger('Error Creating New Subject');
      });
    } else {
      this.alertService.warning('Please Fill Details to add New Subject');
    }
  }
  addNewGroup() {
    if (this.groupDetails.category !== '' && this.groupDetails.name !== '') {
      this.classSer.addGroup(this.groupDetails.category, this.groupDetails.name).subscribe(success => {
        this.alertService.success('New Group Created Successfully');
        console.log(success);
        this.getGroups();
        this.modalService.dismissAll();
      }, error => {
        console.log(error);
        this.alertService.danger('Error Creating New Group');
      });
    } else {
      this.alertService.warning('Please Fill Details to add New Group');
    }
  }
}
