import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Measurements, MeasurementObject, deviceSpec } from './model/measurements';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private _http: Http) { }

  LatestData: Measurements;

  getMeasurementDataById(deviceId: string): MeasurementObject {
    return this.LatestData.devices.find(res => res.deviceid === deviceId);
  }

  getMeasurementData(): Observable<Measurements> {
    return this._http.get('/api/mmnts')
      .map(result => this.LatestData = result.json() as Measurements);
  }
  getDevices(): Observable<deviceSpec[]> {
    return this._http.get('/api/devices')
      .map(result => result.json() as deviceSpec[]);
  }

  getMeasurementsInTimefare(startdate: Date, enddate: Date): Observable<Array<Measurements>> {
    return this._http.post('/api/interval', { 'startdate': startdate.getTime(), 'enddate': enddate.getTime() })
      .map(result => result.json() as Array<Measurements>);
  }
}
