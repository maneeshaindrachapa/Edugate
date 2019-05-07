import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-assistant',
  templateUrl: './search-assistant.component.html',
  styleUrls: ['./search-assistant.component.scss']
})
export class SearchAssistantComponent implements OnInit {
  searchTxt = '';
  allAssistant = [];
  /* data tabel for classes */
  rows = [];
  columns = [
    { prop: 'assistant_id', name: 'Assistant ID' },
    { prop: 'first_name', name: 'First Name' },
    { prop: 'last_name', name: 'Last Name' },
    { prop: 'email', name: 'Email' },
    { prop: 'telephone.mobile', name: 'Mobile No' }
  ];
  selected = [];
  /*************/
  assistant: any;
  assistant_ = { assistant_id: '', first_name: '', last_name: '' };
  constructor(private modalService: NgbModal, private auth: AuthService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.allAssistant = [];
    this.auth.getAssistants().subscribe(success => {
      this.rows = success['data'];
      this.allAssistant = success['data'];
    }, error => {
      console.log(error);
    });
  }
  selectAssistant(t) {
    this.assistant = t.selected[0];
    this.assistant_.assistant_id = this.assistant['assistant_id'];
    this.assistant_.first_name = this.assistant['first_name'];
    this.assistant_.last_name = this.assistant['last_name'];
  }
  deleteProfile(content) {
    if (this.assistant != null) {
      this.modalService.open(content);
    } else {
      this.alertService.warning('Please Select a Assistant');
    }
  }
  getallassistants() {
    this.allAssistant = [];
    this.auth.getAssistants().subscribe(success => {
      this.rows = success['data'];
      this.allAssistant = success['data'];
    }, error => {
      console.log(error);
    });
  }
  deleteAssistant() {
    this.auth.deleteAssistant(this.assistant_.assistant_id).subscribe(success => {
      this.getallassistants();
      this.alertService.success('Successfully Deleted');
      this.assistant = null;
      this.modalService.dismissAll();
    }, error => {
      this.alertService.danger('Error in Server');
      this.modalService.dismissAll();
    });
  }
  viewProfile() {
    if (this.selected.length !== 0) {
      this.auth.getAssistantProfile(this.selected[0]['assistant_id']).subscribe(success => {
        this.auth.setAssistant(success['data']);
        this.router.navigate(['viewProfileAssistant']);
      }, error => {
        console.log(error);
      });
    } else {
      this.alertService.warning('Please Select a Assistant');
    }
  }
  search() {
    this.searchTxt.split(' ').join('');
    this.searchTxt.toLowerCase();
    if (this.searchTxt === '') {
      this.getallassistants();
    } else {
      this.rows = [];
      for (let i = 0; i < this.allAssistant.length; i++) {
        if (((this.allAssistant[i]['first_name']).toLowerCase()).includes(this.searchTxt)) {
          this.rows.push(this.allAssistant[i]);
        } else if (((this.allAssistant[i]['last_name']).toLowerCase()).includes(this.searchTxt)) {
          this.rows.push(this.allAssistant[i]);
        } else if (((this.allAssistant[i]['assistant_id']).toLowerCase()).includes(this.searchTxt)) {
          this.rows.push(this.allAssistant[i]);
        }
      }
    }
  }

}
