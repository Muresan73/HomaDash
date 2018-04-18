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
  private _timeFrame: { startDate: Date, endDate: Date };
  @Input()
  set timeFrame(timeFrame: { startDate: Date, endDate: Date }) {
    this.getFreshData();
    this._timeFrame = timeFrame;
  }
  get timeFrame() { return this._timeFrame; }

  @Input() deviceid: String;

  public lineChartData: Array<any> = [
    { data: [62, 62], label: 'Value' }
  ];
  public lineChartLabels: Array<any> = [1523466380049, 1524071180049];
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

  getFreshData() {

    if (this.timeFrame) {
      console.log(this.lineChartData);
      this._dataService.getMeasurementsInTimefare(this.timeFrame.startDate, this.timeFrame.endDate).subscribe(res => {
        this.lineChartLabels = res.map(x => x.timestamp);
        this.lineChartData = [{
          data: res.map(x => x.devices.filter(device => device.deviceid === this.deviceid)[0].value),
          label: 'value'
        }];

        console.log('kert');
        console.log(this.lineChartLabels);

      });
    }
  }



  ngOnInit(): void {

    // this.refreshSubject.subscribe(timestamp => this.getFreshData(timestamp));


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
