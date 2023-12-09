import { Component } from '@angular/core';
import { Time } from '../data/time';
import { min } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  

  paused:boolean;
  currentTime: Time;
  initialTime: Time;
  defaultTimesPosition: number;
  //only useful when timer is running
  endsAt: Date;
  startedAt: Date;



  constructor(){}

  ngOnInit(){
    this.initialTime = new Time(0,5,0);
    this.currentTime = new Time(0,5,0);
    this.paused = true;
    this.defaultTimesPosition = 3;
    console.log(this.paused);

    setInterval(function (this:TimerComponent) {
      this.tick();
    }.bind(this), 500)
  }

  toggleTimer(){
    if(this.paused){ //start timer
      
      this.endsAt = new Date(Date.now() + (this.currentTime.hours *60*60*1000) + (this.currentTime.minutes * 60 * 1000) + (this.currentTime.seconds * 1000));
      console.log(this.endsAt.toTimeString());
      this.paused = false;
      

    }
    else{ //stop timer
      this.paused = true;

    }
  }

  tick(){
    console.log("tick");

    if(!this.paused && this.endsAt != null){
      const now = Date.now();
      const dif = this.endsAt.getTime() - now;
      var hours = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((dif % (1000 * 60)) / 1000);
      this.currentTime = new Time(hours, minutes, seconds);
      
    }
  }

  reset(){
    this.paused = true;
    this.currentTime = this.initialTime;
  }

  isAtInitialTime(){
    return this.currentTime.hours == this.initialTime.hours && this.currentTime.minutes == this.initialTime.minutes && this.currentTime.seconds == this.initialTime.seconds
  }
  getTimeLeft(){
    if(this.defaultTimesPosition == 0){
      return Time.DEFAULT_TIMES[Time.DEFAULT_TIMES.length-1].toString();
    }
    return Time.DEFAULT_TIMES[this.defaultTimesPosition-1].toString();
  }

  setTimeLeft(){
    this.defaultTimesPosition -= 1;
    if(this.defaultTimesPosition < 0){
      this.defaultTimesPosition = Time.DEFAULT_TIMES.length-1;
    }

    this.initialTime = Time.DEFAULT_TIMES[this.defaultTimesPosition];
    this.currentTime = Time.DEFAULT_TIMES[this.defaultTimesPosition];
  }

  getTimeRight(){
    if(this.defaultTimesPosition == Time.DEFAULT_TIMES.length-1){
      return Time.DEFAULT_TIMES[0].toString();
    }
    return Time.DEFAULT_TIMES[this.defaultTimesPosition+1].toString();
  }

  setTimeRight(){
    this.defaultTimesPosition += 1;
    if(this.defaultTimesPosition > Time.DEFAULT_TIMES.length-1){
      this.defaultTimesPosition = 0;
    }

    this.initialTime = Time.DEFAULT_TIMES[this.defaultTimesPosition];
    this.currentTime = Time.DEFAULT_TIMES[this.defaultTimesPosition];
  }

}
