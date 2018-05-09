import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GaugeSegment, GaugeLabel } from 'ng-gauge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DatepickerdialogComponent } from '../datepickerdialog/datepickerdialog.component';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {


  value: number;
  unit: string;
  isSelected: boolean;

  timeFrame = { endDate: new Date(), startDate: new Date(new Date().getTime() - (60 * 60 * 24 * 7 * 1000)) };
  @Input() id: String;
  @Input() max: number;
  @Input() min: number;
  @Input() w: Number;
  @Input() gwidth: Number;
  @Input() refreshSubject: Subject<any>;
  get hideChart() {
    return !(this.w > 1);
  }
  datepickerDialogRef: MatDialogRef<DatepickerdialogComponent>;

  constructor(private _dataService: DataService, public dialog: MatDialog) {
    this.value = 0;
    this.isSelected = false;
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
    if (this.value > this.max) { alert('Warning:\n' + this.id.toString() + ' has bigger value than max'); }
  }

  openDialog(event: MouseEvent) {
    this.isSelected = true;
    this.datepickerDialogRef = this.dialog.open(DatepickerdialogComponent, {
      height: '150px',
      width: '300px',
    });

    console.log(event.which);
    // this.datepickerDialogRef.updatePosition({ top: event.clientY.toString() + 'px', left: event.clientX.toString() + 'px' });

    this.datepickerDialogRef.componentInstance.data = this.timeFrame;

    this.datepickerDialogRef.afterClosed().subscribe(result => {
      this.isSelected = false;
      if (result) { this.timeFrame = result; }
    });
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
