import { Time } from "@angular/common";

export interface MeasurementsObject {
    deviceid: Number;
    timestamp: Date;
    value: Number;
    unit: string;
}