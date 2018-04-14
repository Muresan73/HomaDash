import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { DinamicIconComponent } from './dinamic-icon/dinamic-icon.component';
import { DataChartComponent } from './data-chart/data-chart.component';
import { ChartsModule } from 'ng2-charts';
import { GridsterModule } from 'angular2gridster';
import { WidgetComponent } from './widget/widget.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GaugeModule } from 'angular-gauge';
import { DatepickerdialogComponent } from './datepickerdialog/datepickerdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DinamicIconComponent,
    DataChartComponent,
    WidgetComponent,
    DatepickerdialogComponent
  ],
  imports: [
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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
