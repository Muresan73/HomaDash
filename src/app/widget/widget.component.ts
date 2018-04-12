import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GaugeSegment, GaugeLabel } from 'ng-gauge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {


  @Input() id: Number;
  @Input() w: Number;
  @Input() gwidth: Number;
  @Input() refreshSubject: Subject<any>;
  get hideChart() {
    return !(this.w > 1);
  }


  colors = {
    indigo: '#14143e',
    pink: '#fd1c49',
    orange: '#ff6e00',
    yellow: '#f0c800',
    mint: '#00efab',
    cyan: '#05d1ff',
    purple: '#841386',
    white: '#fff'
  };

  laneGraph = {
    bgRadius: 100,
    bgColor: this.colors.indigo,
    rounded: true,
    reverse: true,
    animationSecs: 5,
    segments: [
      new GaugeSegment({
        value: 4,
        color: this.colors.mint,
        bgColor: `${this.colors.mint}22`,
        radius: 85,
        borderWidth: 2
      }),
      new GaugeSegment({
        value: 8,
        color: this.colors.pink,
        bgColor: `${this.colors.pink}22`,
        radius: 70,
        borderWidth: 2
      }),
      new GaugeSegment({
        value: 15,
        color: this.colors.cyan,
        bgColor: `${this.colors.cyan}22`,
        radius: 55,
        borderWidth: 2
      }),
      new GaugeSegment({
        value: 16,
        color: this.colors.yellow,
        bgColor: `${this.colors.yellow}22`,
        radius: 40,
        borderWidth: 2
      }),
      new GaugeSegment({
        value: 23,
        color: this.colors.purple,
        bgColor: `${this.colors.purple}22`,
        radius: 25,
        borderWidth: 2
      }),
      new GaugeSegment({
        value: 42,
        color: this.colors.orange,
        bgColor: `${this.colors.orange}22`,
        radius: 10,
        borderWidth: 2
      })
    ]
  };

  resizeing() {
    this.gwidth = document.getElementsByClassName('widgetitem')[0].parentElement.clientHeight;
  }

  constructor() {
    Observable.fromEvent(window, 'resize')
      .debounceTime(550)
      .subscribe((event) => {
        this.resizeing();
      });

  }


  ngOnInit() {
    this.gwidth = document.getElementsByClassName('widgetitem')[0].parentElement.clientHeight;
    // Array.from(document.getElementsByClassName('itemgauge'))
    //   .map(gauge => {
    //     (<HTMLElement>gauge).style.width = '200px';
    //     console.log((<HTMLElement>gauge).parentElement.parentElement.clientHeight);
    //   });
  }

}
