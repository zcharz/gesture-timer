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
  selected:number;

  public static MAX_TIMERS = 3;

  constructor() { }

  ngOnInit(): void {
    this.timers.push(new TimerComponent());
    this.selected = 0;
    this.timers[this.selected].selected = true;
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    console.log(this.gesture);
    console.log(this.timers[this.selected]);

    // start timer
    if(this.gesture == "Open Hand" && this.timers[this.selected].started == false){
      this.timers[this.selected].startOrReset();
      console.log('WHY');
    }
    // resume timer
    else if(this.gesture == "Open Hand" && this.timers[this.selected].started == true){
      this.timers[this.selected].toggleTimer();
    }
    

    if (this.gesture == "Closed Hand") {
      this.timers[this.selected].toggleTimer();
      console.log('WHY');
    }

    if (this.gesture == "Hand Pointing") {
      this.selectNext();
    }

    if (this.gesture == "Two Open Hands") {
      this.timers[this.selected].locked = true;
    }

    if (this.gesture == "Two Hands Pointing") {
      this.timers[this.selected].locked = false;
    }

    // reset timer
    if (this.gesture == "Two Closed Hands" && this.timers[this.selected].started == true) {
      this.timers[this.selected].startOrReset();
    }

    if (this.gesture == "Open Hand and Hand Pointing") {
      this.timers[this.selected].setTimeLeft();
    }

    if (this.gesture == "Closed Hand and Hand Pointing") {
      this.timers[this.selected].setTimeRight();
    }
  }

  newTimer(): void {
    if(this.timers.length == HomePageComponent.MAX_TIMERS){
      return;
    }
    this.timers.push(new TimerComponent());
    this.timers[this.timers.length-1].selected = false;
  }

  removeTimer(){
    if(this.selected == this.timers.length-1){
      this.selected -= 1;
    }
    this.timers.splice(this.timers.length-1, 1);
  }

  selectNext(){
    this.timers[this.selected].selected = false;
    this.selected += 1;
    if(this.selected > this.timers.length-1){
      this.selected = 0;
    }
    this.timers[this.selected].selected = true;
  }
}
