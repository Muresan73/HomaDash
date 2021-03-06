﻿import { Time } from "@angular/common";

export interface MeasurementObject {
    deviceid: String;
    value: Number;
    unit: string;
}

export interface Measurements {
    devices: MeasurementObject[];
    timestamp: Date;
}

export interface deviceSpec {
    deviceid: String;
    max: Number;
    min: Number;
}