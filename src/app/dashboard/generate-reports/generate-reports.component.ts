import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-reports',
  templateUrl: './generate-reports.component.html',
  styleUrls: ['./generate-reports.component.scss']
})
export class GenerateReportsComponent implements OnInit {
  allClasses = [];
  selectClass = '';
  from = new Date();
  to = new Date();
  classes = [];
  constructor(private classSer: ClassService,
    private modalService: NgbModal,
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
  generate() {
    if (this.selectClass === '') {
      for (let i = 0; i < this.classes.length; i++) {
        this.classSer.generateReports(this.classes[i]['_id'], this.from, this.to).subscribe(success => {
          console.log(success);
          this.allClasses.push(success);
        }, error => {
          console.log(error);
        });
      }
    } else {
      this.classSer.generateReports(this.selectClass, this.from, this.to).subscribe(success => {
        console.log(success);
      }, error => {
        console.log(error);
      });
    }
  }
}
