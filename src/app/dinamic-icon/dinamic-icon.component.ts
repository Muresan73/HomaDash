import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dinamic-icon',
  templateUrl: './dinamic-icon.component.html',
  styleUrls: ['./dinamic-icon.component.css']
})

export class DinamicIconComponent implements OnInit {

  @Input() value: number;
  @Input() min: number;
  @Input() max: number;

  get ratio(): number {
    return (this.value - this.min) / this.max;
  }

  constructor() { }

  ngOnInit() {
  }

}
