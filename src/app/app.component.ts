import { Component, OnInit, AnimationTransitionMetadata, AnimationTransitionEvent } from '@angular/core';
import { DataService } from './data.service';
import { Measurements } from './model/measurements';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AnimateTimings } from '@angular/core/src/animation/dsl';
import { WidgetComponent } from './widget/widget.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  loop: any;

  refreshSubject = new Subject();

  widgets: Array<any>;
  gridsterOptions = {
    lanes: 5, // how many lines (grid cells) dashboard has
    direction: 'vertical', // items floating direction: vertical/horizontal
    widthHeightRatio: 1,
    floating: false,
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
      }
    ]
  };
  itemOptions = {
    maxHeight: 1
  };

  constructor(private _dataService: DataService) {
    // this.loop = setInterval(() => { this.getData(); }, 2000);
  }

  ngOnInit(): void {
    this._dataService.getDevices().subscribe(res => {
      this.widgets = res.map(x => ({
        title: x.deviceid, w: 2, h: 1, max: x.max, min: x.min
      }));

      if (localStorage.getItem('widgets')) {
        const storedwidgets = JSON.parse(localStorage.getItem('widgets'));
        if (res.map(x => x.deviceid).reduce((x, y) => x.toString() + y.toString())
          === storedwidgets.map(element => element.title).reduce((x, y) => x + y)) {
          this.widgets = storedwidgets;
        }
      }
    });
  }

  notifyChildren(timestamp: Date) {
    this.refreshSubject.next(timestamp);
  }

  getData() {
    this._dataService.getMeasurementData().subscribe(res => {
      this.notifyChildren(res.timestamp);
    });
  }

  savePosition() {
    localStorage.setItem('widgets', JSON.stringify(this.widgets));
  }

  stopit() {
    clearInterval(this.loop);
  }
}
