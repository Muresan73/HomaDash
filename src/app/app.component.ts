import { Component } from '@angular/core';
import { DataService } from './data.service';
import { MeasurementsObject } from './model/measurements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test';
  loop: any;

  data: MeasurementsObject[];

  getData() {
    this._dataService.getMesurementData().subscribe(res => res.forEach(element => {
      if (this.data.length > 10) {
        this.data.shift();
      }
      this.data.push(element);
    }));
    console.log(this.data);
  }

  getTestData() {
    this._dataService.getMesurementData().subscribe(res => console.log(res));

  }

  stopit() {
    clearInterval(this.loop);
  }

  constructor(private _dataService: DataService) {
    this._dataService.getMesurementData().subscribe(res => this.data = res);
    // this.loop = setInterval(() => { this.getData(); }, 1000);
  }
}
