import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Measurements } from './model/measurements';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private _http: Http) { }

  getTestData() {
    return this._http.get('/api/test')
      .map(result => result.json().data);
  }

  getMeasurementData(): Observable<Measurements> {
    return this._http.get('/api/mmnts')
      .map(result => result.json() as Measurements);
  }
}
