import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  @Input() id: Number;
  @Input() w: Number;
  @Input() refreshSubject: Subject<any>;

  constructor() {

  }

  ngOnInit() {
  }

}
