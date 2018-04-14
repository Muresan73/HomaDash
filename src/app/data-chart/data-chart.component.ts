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

  public lineChartData: Array<any> = [
    { data: [], label: 'Value' }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: { displayColors: false },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          tooltipFormat: 'HH:mm:ss YY/M/d',
          displayFormats: {
            'millisecond': 'MMM DD',
            'second': 'MMM DD',
            'minute': 'MMM DD',
            'hour': 'MMM DD',
            'day': 'MMM DD',
            'week': 'MMM DD',
            'month': 'MMM DD',
            'quarter': 'MMM DD',
            'year': 'MMM DD',
          }
        },
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          maxTicksLimit: 3
        }
      }]
    }
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointRadius: 2
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';


  chart: Chart;
  @Input() refreshSubject: Subject<any>;
  @Input() devideId: string;

  constructor(private _dataService: DataService) { }

  getFreshData(timestamp: Date) {
    const measurementObject = this._dataService.getMeasurementDataById(this.devideId);
    this.lineChartLabels.push(timestamp);
    this.lineChartData = this.lineChartData.map((dataset, index) => {
      return { data: dataset.data.concat(measurementObject.value), label: dataset.label };

    });
  }


  ngOnInit(): void {

    console.log(this.devideId);
    console.log(document.getElementById(this.devideId));

    this.refreshSubject.subscribe(timestamp => this.getFreshData(timestamp));
    // console.log(document.getElementById(this.devideId).getElementsByClassName('datachart')[0]);
    /*this.chart = new Chart(document.getElementById(this.devideId).getElementsByClassName('datachart')[0],
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
      });*/
  }
}
