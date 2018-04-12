import { Component, OnInit, AnimationTransitionMetadata, AnimationTransitionEvent } from '@angular/core';
import { DataService } from './data.service';
import { Measurements } from './model/measurements';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AnimateTimings } from '@angular/core/src/animation/dsl';
import { WidgetComponent } from './widget/widget.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loop: any;
  datas = new Array<Measurements>();
  chart: Chart;

  refreshSubject = new Subject();

  widgets: Array<any> = [
    {
      x: 0, y: 0,
      w: 2, h: 1,
      resizable: true,
      title: 'lc92'
    },
    {
      x: 0, y: 1, w: 3, h: 1,
      resizable: true,
      title: 'pq44'
    }, {
      x: 1, y: 0, w: 3, h: 1,
      resizable: true,
      title: 'pq44'
    }
  ];
  gridsterOptions = {
    lanes: 5, // how many lines (grid cells) dashboard has
    direction: 'vertical', // items floating direction: vertical/horizontal
    widthHeightRatio: 1,
    floating: true,
    resizable: true, // possible to resize items by drag n drop by item edge/corner
    useCSSTransforms: true, // improves rendering performance by using CSS transform in place of left/top
    responsiveView: true, // turn on adopting items sizes on window resize and enable responsiveOptions
    responsiveDebounce: 500, // window resize debounce time
    resizeHandles: { e: true, w: true },
    responsiveOptions: [
      {
        breakpoint: 'sm',
        minWidth: 0,
        lanes: 3
      },
      {
        breakpoint: 'md',
        minWidth: 768,
        lanes: 4
      },
      {
        breakpoint: 'lg',
        minWidth: 1250,
        lanes: 6
      },
      {
        breakpoint: 'xl',
        minWidth: 1800,
        lanes: 8
      }
    ]
  };
  itemOptions = {
    maxWidth: 3,
    maxHeight: 1
  };

  constructor(private _dataService: DataService) {
    // this.loop = setInterval(() => { this.getData(); }, 986);
  }

  notifyChildren(timestamp: Date) {
    this.refreshSubject.next(timestamp);
  }

  getData() {
    this._dataService.getMeasurementData().subscribe(res => {
      if (this.datas.length > 3) {
        this.datas.shift();
      }
      this.datas.push(res);
      this.notifyChildren(res.timestamp);
    });
  }

  getTestData() {
    this._dataService.getMeasurementData().subscribe(res => console.log(res));

  }

  stopit() {
    clearInterval(this.loop);
  }
}
