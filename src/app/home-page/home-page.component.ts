import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';
import { TimerComponent } from '../timer/timer.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  
  timers: TimerComponent[] = [];
  currentlySelected: TimerComponent;
  selected:number;

  public static MAX_TIMERS = 3;

  constructor() { }

  ngOnInit(): void {
    this.timers.push(new TimerComponent());
    this.selected = 0;
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
  }
  newTimer(): void {
    if(this.timers.length == HomePageComponent.MAX_TIMERS){
      return;
    }
    this.timers.push(new TimerComponent());
  }
  removeTimer(){
    if(this.selected == this.timers.length-1){
      this.selected -= 1;
    }
    this.timers.splice(this.timers.length-1, 1);
    
  }
  selectNext(){
    this.selected += 1;
    if(this.selected > this.timers.length-1){
      this.selected = 0;
    }
  }
}
