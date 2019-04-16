import { Component, OnInit, NgZone } from '@angular/core';
import * as $ from 'jquery';
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  triggered = 0;
  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
  }

  
  onIntersection(): void {
    this.triggered += 1;
    const options = {
      startVal: 0,
      duration: 2,
      suffix: '+',
      useEasing: false
    };
    if (this.triggered === 2) {
      const countUp1 = new CountUp('myTargetElement1', 40, options);
      const countUp2 = new CountUp('myTargetElement2', 150, options);
      const countUp3 = new CountUp('myTargetElement3', 2150, options);
      const countUp4 = new CountUp('myTargetElement4', 50, options);
      if (!countUp1.error && !countUp2.error && !countUp3.error) {
        countUp1.start();
        countUp2.start();
        countUp3.start();
        countUp4.start();
      } else {
        console.error(countUp1.error);
        console.error(countUp2.error);
        console.error(countUp3.error);
        console.error(countUp4.error);
      }
    }
  }
}

