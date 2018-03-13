import { Component, AfterContentInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Measurements, MeasurementObject } from '../model/measurements';
import { DataService } from '../data.service';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.css']
})
export class DataChartComponent implements AfterContentInit {

  chart: Chart;
  @Input() refreshSubject: Subject<any>;
  @Input() devideId: string;
  myId: string;

  constructor(private _dataService: DataService) { this.myId = 'chart' + this.devideId; }

  getFreshData(timestamp: Date) {
    const measurementObject = this._dataService.getMeasurementDataById(this.devideId);
    console.log(measurementObject);
    if (this.chart) {
      this.chart.data.labels.push(timestamp);
      this.chart.data.datasets.forEach((dataset, index) => {
        dataset.data.push(measurementObject.value);
      });
      this.chart.update();
    }
  }


  ngAfterContentInit(): void {

    console.log('---' + this.myId);
    console.log(document.getElementById(this.devideId).getElementsByClassName('datachart')[0]);
    console.log('---');
    this.refreshSubject.subscribe(timestamp => this.getFreshData(timestamp));
    this.chart = new Chart(document.getElementById(this.devideId).getElementsByClassName('datachart')[0],
      {
        type: 'line',
        responsive: true,
        showXLabels: 3,
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              borderColor: '#3cba9f',
              backgroundColor: '#3cba9f55',
              fill: true,
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          },
          scales: {
            yAxes: {
              display: false
            },
            xAxes: {
              type: 'time',
            }
          }
        }
      });
  }
}
