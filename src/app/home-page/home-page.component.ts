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
  constructor() { }

  timers: TimerComponent[] = [];
  ngOnInit(): void {
    this.timers.push(new TimerComponent());
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
  }
  newTimer(): void {
    this.timers.push(new TimerComponent());
  }

}
