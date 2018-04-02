import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { DinamicIconComponent } from './dinamic-icon/dinamic-icon.component';
import { DataChartComponent } from './data-chart/data-chart.component';
import { GridsterModule } from 'angular2gridster';
import { WidgetComponent } from './widget/widget.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { GaugeModule } from 'ng-gauge';

@NgModule({
  declarations: [
    AppComponent,
    DinamicIconComponent,
    DataChartComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    GridsterModule,
    MatGridListModule,
    GaugeModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
