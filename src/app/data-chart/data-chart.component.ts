import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Measurements, MeasurementObject } from '../model/measurements';
import { DataService } from '../data.service';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.css']
})
export class DataChartComponent implements OnInit {

  chart: Chart;
  @Input() refreshSubject: Subject<any>;
  @Input() devideId: string;

  constructor(private _dataService: DataService) { }

  getFreshData(timestamp: Date) {
    const measurementObject = this._dataService.getMeasurementDataById(this.devideId);
    console.log(this.devideId);
    console.log(measurementObject);
    if (this.chart) {
      this.chart.data.labels.push(timestamp);
      this.chart.data.datasets.forEach((dataset, index) => {
        dataset.data.push(measurementObject.value);
      });
      this.chart.update();
    }
  }


  ngOnInit(): void {

    console.log(this.devideId);
    console.log(document.getElementById(this.devideId));

    this.refreshSubject.subscribe(timestamp => this.getFreshData(timestamp));
    // console.log(document.getElementById(this.devideId).getElementsByClassName('datachart')[0]);
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
              radius: 2
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
            xAxes: [{
              display: false,
              type: 'time',
              distribution: 'linear',
              time: {
                tooltipFormat: 'HH:mm:ss YY/M/d'
              }
            }]
          }
        }
      });
  }
}
