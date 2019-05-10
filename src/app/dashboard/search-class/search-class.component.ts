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
  deleteClass_: any;

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
  search() {
    console.log(this.selectedValue);
    if (this.searchTxt !== '') {
      this.classes = [];
      if (this.selectedValue === 'bySub') {
        this.classSer.getClassesBySubject(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            this.classes.push(success['data'][i]);
          }
        }, error => {
          console.log(error);
        });
      } else if (this.selectedValue === 'byTeacher') {
        this.classSer.getClassesByTeacher(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            this.classes.push(success['data'][i]);
          }
        }, error => {
          console.log(error);
        });
      } else if (this.selectedValue === 'byBatch') {
        this.classSer.getClassesByBatch(this.searchTxt).subscribe(success => {
          for (let i = 0; i < success['data'].length; i++) {
            this.classes.push(success['data'][i]);
          }
        }, error => {
          console.log(error);
        });
      }
    } else {
      this.getClasses();
    }
  }
  deleteClass(content, class_) {
    this.deleteClass_ = class_;
    this.modalService.open(content);
  }
  deleteClassF() {
    this.classSer.deleteClass(this.deleteClass_['_id']).subscribe(success => {
      this.alertService.success('Class Deleted Successfully');
      this.getClasses();
      this.deleteClass_ = null;
      this.modalService.dismissAll();
    }, error => {
      console.log(error['error']['success']);
      if (error['error']['success'] === false) {
        this.alertService.danger(error['error']['message']);
      } else {
        this.alertService.danger('Error Occured While Deleting Class');
      }
      this.getClasses();
      this.deleteClass_ = null;
      this.modalService.dismissAll();
    });
  }
  editClasses(class_) {
    localStorage.setItem('class', JSON.stringify(class_));
    this.router.navigate(['editClass']);
  }
  assignStudents(class_) {
    localStorage.setItem('class', JSON.stringify(class_));
    this.router.navigate(['assignStudentClass']);
  }
}
