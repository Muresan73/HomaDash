import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dinamic-icon',
  templateUrl: './dinamic-icon.component.html',
  styleUrls: ['./dinamic-icon.component.css']
})

export class DinamicIconComponent implements OnInit {

  value: number;
  @Input() min: number;
  @Input() max: number;
  @Input() refreshSubject: Subject<any>;
  @Input() devideId: string;
  @Input() iconType: string;
  oldratio: number;

  get ratio(): number {
    return (this.value - this.min) / this.max;
  }

  getFreshData(timestamp: Date) {
    this.oldratio = this.ratio;
    this.value = this._dataService.getMeasurementDataById(this.devideId).value.valueOf();
  }
  constructor(private _dataService: DataService) { this.value = 0; this.oldratio = 0; }

  ngOnInit() {
    this.refreshSubject.subscribe(timestamp => this.getFreshData(timestamp));
  }

}
