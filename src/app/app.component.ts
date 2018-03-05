import { Component, NgZone } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test';

  data: Array<any>;

  getData() {

    this._dataService.getTestData().subscribe(res => res.forEach(element => {
      if (this.data.length > 10) {
        this.data.shift();
      }
      this.data.push(element);
    }));
    console.log(this.data);
  }

  constructor(private _dataService: DataService) {
    this._dataService.getTestData().subscribe(res => this.data = res);
    setInterval(() => { this.getData(); }, 1000);
  }
}
