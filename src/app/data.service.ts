import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { MeasurementsObject } from './model/measurements';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private _http: Http) { }

  getTestData() {
    return this._http.get('/api/test')
      .map(result => result.json().data);
  }

  getMeasurementData(): Observable<MeasurementsObject[]> {
    return this._http.get('/api/mmnts')
      .map(result => result.json() as MeasurementsObject[]);
  }
}
