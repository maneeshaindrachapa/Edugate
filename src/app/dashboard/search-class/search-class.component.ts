import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-search-class',
  templateUrl: './search-class.component.html',
  styleUrls: ['./search-class.component.scss']
})
export class SearchClassComponent implements OnInit {
  searchTxt = '';
  selectedValue = '';
  classes = [];

  constructor(private classSer: ClassService,
    private modalService: NgbModal,
    private auth: AuthService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    this.getClasses();
  }
  getClasses() {
    this.classes = [];
    this.classSer.getClasses().subscribe(success => {
      for (let i = 0; i < success['data'].length; i++) {
        this.classes.push(success['data'][i]);
      }
    }, error => {
      this.alertService.danger('Error Getting Classes');
      console.log(error);
    });
  }
  onChange(class_, $event) {
    if ($event.currentValue) {
      this.classSer.enableMarking(class_['_id'], class_).subscribe(succes => {
        this.alertService.success('Enabled For Marking');
      }, error => {
        this.alertService.danger('Error Enabling Class for marking');
        console.log(error);
      });
    } else {
      this.classSer.enableMarking(class_['_id'], class_).subscribe(succes => {
        this.alertService.warning('Disabled For Marking');
      }, error => {
        this.alertService.danger('Error Disabling Class for marking');
        console.log(error);
      });
    }
  }

}
