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


  title = 'Test';
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
      x: 0, y: 0, w: 3, h: 1,
      resizable: true,
      title: 'pq44'
    }
  ];
  gridsterOptions = {
    lanes: 3, // how many lines (grid cells) dashboard has
    direction: 'vertical', // items floating direction: vertical/horizontal
    maxHeight: 1,
    widthHeightRatio: 0.8,
    resizable: true, // possible to resize items by drag n drop by item edge/corner
    useCSSTransforms: true, // improves rendering performance by using CSS transform in place of left/top
  };

  constructor(private _dataService: DataService) {
    this.loop = setInterval(() => { this.getData(); }, 986);
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
      Array.from(document.getElementsByClassName('anim')).map((x) => x.beginElement());
    });
  }

  getTestData() {
    this._dataService.getMeasurementData().subscribe(res => console.log(res));

  }

  stopit() {
    clearInterval(this.loop);
  }
}
