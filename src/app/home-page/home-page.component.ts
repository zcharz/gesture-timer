import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
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


  @ViewChildren(TimerComponent) timerComponents: QueryList<TimerComponent>;
  timerComponentArray: TimerComponent[];

  ngOnInit(): void {
    this.timers.push(new TimerComponent());
    this.selected = 0;
    this.timers[this.selected].selected = true;
  }

  ngAfterViewInit() {
    this.timerComponentArray = this.timerComponents.toArray();
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    // console.log(this.gesture);
    this.timerComponentArray = this.timerComponents.toArray();

    // start timer
    if(this.gesture == "Open Hand" && this.timerComponentArray[this.selected].started == false){
      this.timerComponentArray[this.selected].startOrReset();
    }
    // resume timer
    else if(this.gesture == "Open Hand" && this.timerComponentArray[this.selected].started == true){
      this.timerComponentArray[this.selected].toggleTimer();
    }

    if (this.gesture == "Closed Hand") {
      this.timerComponentArray[this.selected].toggleTimer();
    }

    if (this.gesture == "Hand Pointing") {
      this.timerComponentArray[this.selected].selected = false;
      this.selectNext();
      this.timerComponentArray[this.selected].selected = true;
    }

    if (this.gesture == "Two Open Hands") {
      this.timerComponentArray[this.selected].locked = true;
    }

    if (this.gesture == "Two Hands Pointing") {
      this.timerComponentArray[this.selected].locked = false;
    }

    // reset timer
    if (this.gesture == "Two Closed Hands" && this.timerComponentArray[this.selected].started == true) {
      this.timerComponentArray[this.selected].startOrReset();
    }

    if (this.gesture == "Open Hand and Hand Pointing") {
      this.timerComponentArray[this.selected].setTimeLeft();
    }

    if (this.gesture == "Closed Hand and Hand Pointing") {
      this.timerComponentArray[this.selected].setTimeRight();
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
