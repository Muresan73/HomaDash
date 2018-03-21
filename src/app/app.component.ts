import { Component, AfterViewInit, AnimationTransitionMetadata, AnimationTransitionEvent } from '@angular/core';
import { DataService } from './data.service';
import { Measurements } from './model/measurements';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AnimateTimings } from '@angular/core/src/animation/dsl';

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

      console.log('értesít');
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
