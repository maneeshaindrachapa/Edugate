import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from 'src/app/services/class.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-view-profile-assistant',
  templateUrl: './view-profile-assistant.component.html',
  styleUrls: ['./view-profile-assistant.component.scss']
})
export class ViewProfileAssistantComponent implements OnInit {
  role = '';
  profile_pic = 'people-avatar-1.jpg';
  assistantDetails: any;
  classes = [];
  /* data tabel for classes */
  rows = [];
  // server  change details according to this
  columns = [
    { prop: 'subject_id', name: 'Subject' },
    { prop: 'batch_id', name: 'Batch' },
    { prop: 'group_id', name: 'Group' },
    { prop: 'day_of_week', name: 'Day' },
    { prop: 'starting_time', name: 'Time' }
  ];
  selected = [];
  /*************/
  // tslint:disable-next-line:max-line-length
  constructor(private auth: AuthService, private alertService: AlertService, private modalService: NgbModal, private classSer: ClassService) { }

  ngOnInit() {
    this.assistantDetails = JSON.parse(localStorage.getItem('assistant'));
    this.getClasses();
  }
  selectClass({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  getClasses() {
    this.classes = [];
    this.selected = [];
    this.classSer.getClassesOfAssistant(this.assistantDetails['assistant_id']).subscribe(success => {
      for (let i = 0; i < success['data'].length; i++) {
        this.classes.push(success['data'][i]);
      }
      this.rows = this.classes;
      console.log(this.rows);
      console.log(this.classes);
    }, error => {
      console.log(error);
    });
  }
  editAssistant() {
    this.auth.editAssistant(this.assistantDetails).subscribe(success => {
      this.alertService.success('Details Updated Successfully');
    }, error => {
      console.log(error);
      this.alertService.danger('Error Updating Details');
    });
  }

}
