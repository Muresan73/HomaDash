import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Measurements, MeasurementObject } from './model/measurements';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private _http: Http) { }

  LatestData: Measurements;

  getTestData() {
    return this._http.get('/api/test')
      .map(result => result.json().data);
  }

  getMeasurementDataById(deviceId: string): MeasurementObject {
    return this.LatestData.devices.find(res => res.deviceid === deviceId);
  }

  getMeasurementData(): Observable<Measurements> {
    return this._http.get('/api/mmnts')
      .map(result => this.LatestData = result.json() as Measurements);
  }
  getDevices(): Observable<Array<String>> {
    return this._http.get('/api/devices')
      .map(result => result.json() as Array<String>);
  }
}
