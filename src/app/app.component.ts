import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test';

  data: Array<any>;

  constructor(private _dataService: DataService) {

    this._dataService.getTestData().subscribe(res => this.data = res);
  }
}
