import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  imageSources = ['../../../../assets/img/1.jpg',
    '../../../../assets/img/2.jpg',
    '../../../../assets/img/3.jpg',
    '../../../../assets/img/4.jpg',
    '../../../../assets/img/5.jpg'
  ];
  images = ['../../../../assets/img/1.png', '../../../../assets/img/1.png', '../../../../assets/img/1.png'];

  constructor() { }

  ngOnInit() {
  }

}
