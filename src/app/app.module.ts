import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { DinamicIconComponent } from './dinamic-icon/dinamic-icon.component';
import { DataChartComponent } from './data-chart/data-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    DinamicIconComponent,
    DataChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
