import { Time } from '@angular/common';

export interface User {
    username: string;
    uid: string;
    name: string;
    isDriver: boolean;
    isRequestDriver: boolean;
    blocked: boolean;
    phoneno: string
    
    
}