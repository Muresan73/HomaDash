import { Component, AfterViewInit } from '@angular/core';
import { DataService } from './data.service';
import { Measurements } from './model/measurements';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = 'Test';
  loop: any;
  datas = new Array<Measurements>();
  chart: Chart;

  constructor(private _dataService: DataService) {
    this.loop = setInterval(() => { this.getData(); }, 986);
  }

  ngAfterViewInit(): void {
    console.log(this.datas.map(element => element.timestamp));
    console.log(this.datas.map(element => element.devices[0].value));
    console.log('-------');
    this.chart = new Chart('canvas',
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
              fill: true,
            },
            {
              data: [],
              borderColor: '#8c2aff',
              fill: true,
            },
            {
              data: [],
              borderColor: '#ff2a5c',
              fill: true,
            },
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
    console.log(document.getElementById('canvas'));
  }

  getData() {
    this._dataService.getMeasurementData().subscribe(res => {
      if (this.datas.length > 3) {
        this.datas.shift();
      }
      this.datas.push(res);
      if (this.chart) {
        this.chart.data.labels.push(res.timestamp);
        this.chart.data.datasets.forEach((dataset, index) => {
          dataset.data.push(res.devices[index].value);
        });
        this.chart.update();
      }
    });

    console.log(this.chart.data.datasets);
  }

  getTestData() {
    this._dataService.getMeasurementData().subscribe(res => console.log(res));

  }

  stopit() {
    clearInterval(this.loop);
  }
}
