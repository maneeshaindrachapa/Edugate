import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  images = [
    {image: '../assets/img/avatar/people-avatar-2.jpg'},
    {image: '../../assets/img/avatar/people-avatar-3.jpg'},
    {image: '../../assets/img/avatar/people-avatar-4.jpg'},
    {image: '../../assets/img/avatar/people-avatar-5.jpg'},
    {image: '../../assets/img/avatar/people-avatar-2.jpg'},
    {image: '../../assets/img/avatar/people-avatar-3.jpg'},
    {image: '../../assets/img/avatar/people-avatar-4.jpg'},
    {image: '../../assets/img/avatar/people-avatar-5.jpg'}
  ];
  slideConfig = {'slidesToShow': 4, 'slidesToScroll': 4, 'arrows': true};
  myCarouselOptions = {items: 4, dots: false, nav: true,responsiveClass:true,
    responsive: {
        0: {
            items: 1,
            nav: false,
            dots:true
        },
        600: {
            items: 3,
            nav: true
        },
        1000: {
            items: 4,
            nav: true
        }
    }};
  constructor() { }

  ngOnInit() {
  }

}
