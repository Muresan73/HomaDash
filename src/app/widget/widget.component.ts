import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GaugeSegment, GaugeLabel } from 'ng-gauge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {


  value: number;
  unit: string;
  @Input() id: String;
  @Input() w: Number;
  @Input() gwidth: Number;
  @Input() refreshSubject: Subject<any>;
  get hideChart() {
    return !(this.w > 1);
  }

  constructor(private _dataService: DataService) {
    Observable.fromEvent(window, 'resize')
      .debounceTime(550)
      .subscribe((event) => {
        this.resizeing();
      });

  }
  resizeing() {
    this.gwidth = document.getElementsByClassName('widgetitem')[0].parentElement.clientHeight;
  }
  getFreshData(timestamp: Date) {
    const freshMeasurementData = this._dataService.getMeasurementDataById(this.id.toString());
    this.value = freshMeasurementData.value.valueOf();
    this.unit = freshMeasurementData.unit.toString();
  }

  ngOnInit() {
    this.refreshSubject.subscribe(timestamp => this.getFreshData(timestamp));
    this.gwidth = document.getElementsByClassName('widgetitem')[0].parentElement.clientHeight;
    // Array.from(document.getElementsByClassName('itemgauge'))
    //   .map(gauge => {
    //     (<HTMLElement>gauge).style.width = '200px';
    //     console.log((<HTMLElement>gauge).parentElement.parentElement.clientHeight);
    //   });
  }

}
