import { Injectable } from '@angular/core';
import {Time } from '../data/time';
@Injectable({
  providedIn: 'root'
})
export class TimerServiceService {

  public static CountdownDate:Date;

  constructor() { }

  public addTime(d:Date, t:Time){
    
  }
}
