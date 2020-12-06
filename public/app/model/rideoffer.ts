import { Time } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Rideoffer {
    pickup: string;
    destination: string;
    date: String;
    time: String;
    passenger: number;
    fee: string;
    userid: string;
    phoneno: string
    name: string  ;  
}