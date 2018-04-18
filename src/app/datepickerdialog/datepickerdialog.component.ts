import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepickerdialog',
  templateUrl: './datepickerdialog.component.html',
  styleUrls: ['./datepickerdialog.component.css']
})
export class DatepickerdialogComponent implements OnInit {

  data: { startDate: Date, endDate: Date };

  constructor() { }

  ngOnInit() {

  }

}
