import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { WebsocketService } from './websocket.service';

import { AppComponent } from './app.component';
import { DataChartComponent } from './data-chart/data-chart.component';
import { ChartsModule } from 'ng2-charts';
import { GridsterModule } from 'angular2gridster';
import { WidgetComponent } from './widget/widget.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GaugeModule } from 'angular-gauge';
import { DatepickerdialogComponent } from './datepickerdialog/datepickerdialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DataChartComponent,
    WidgetComponent,
    DatepickerdialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    GridsterModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    GaugeModule.forRoot(),
    ChartsModule
  ],
  entryComponents: [DatepickerdialogComponent],
  providers: [DataService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
