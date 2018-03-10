import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Measurements } from './model/measurements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test';
  loop: any;
  datas = new Array<Measurements>();

  constructor(private _dataService: DataService) {
    this.loop = setInterval(() => { this.getData(); }, 986);
  }

  getData() {
    this._dataService.getMeasurementData().subscribe(res => {
      if (this.datas.length > 3) {
        this.datas.shift();
      }
      this.datas.push(res);
    });
    // console.log(this.datas);
  }

  getTestData() {
    this._dataService.getMeasurementData().subscribe(res => console.log(res));

  }

  stopit() {
    clearInterval(this.loop);
  }
}
