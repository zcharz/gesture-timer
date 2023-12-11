import { Component, Input } from '@angular/core';
import { Time } from '../data/time';
import { min } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent {
  @Input() selected:boolean = false;

  started:boolean;
  paused:boolean;
  locked:boolean;
  currentTime: Time;
  initialTime: Time;
  defaultTimesPosition: number;

  //only useful when timer is running
  endsAt: Date;



  constructor(){}

  ngOnInit(){
    this.initialTime = new Time(0,5,0);
    this.currentTime = new Time(0,5,0);
    this.started = false;
    this.paused = true;
    this.locked = false;
    this.defaultTimesPosition = 3;
    console.log(this.paused);

    setInterval(function (this:TimerComponent) {
      this.tick();
    }.bind(this), 500)

  }

  tick(){
    console.log("tick");

    if(!this.paused && this.endsAt != null){
      this.updateTime();
    }
    if(this.currentTime.isZero()){
      this.paused = true;
    }
  }

  updateTime(){ //sets currentTime assuming that endsAt is properly set
    const dif = this.endsAt.getTime() - Date.now();
    var hours = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((dif % (1000 * 60)) / 1000);
    this.currentTime = new Time(hours, minutes, seconds);
  }

  startOrReset(){
    if(this.locked){return}

    if(this.started){ //reset
      this.started = false;
      this.paused = true;
      this.currentTime = this.initialTime;
    }
    else{ //start
      this.started = true;
      this.paused = false;
      this.endsAt = new Date(Date.now() + (this.currentTime.hours *60*60*1000) + (this.currentTime.minutes * 60 * 1000) + (this.currentTime.seconds * 1000));
    }
  }
  toggleTimer(){ 
    if(this.locked){return}
    
    if(this.paused){ //resume
      this.endsAt = new Date(Date.now() + (this.currentTime.hours *60*60*1000) + (this.currentTime.minutes * 60 * 1000) + (this.currentTime.seconds * 1000));
      console.log(this.endsAt.toTimeString());
      this.paused = false;
    }
    else{ //pause
      this.paused = true;

    }
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
    if(this.locked){return}

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
    if(this.locked){return}

    this.defaultTimesPosition += 1;
    if(this.defaultTimesPosition > Time.DEFAULT_TIMES.length-1){
      this.defaultTimesPosition = 0;
    }

    this.initialTime = Time.DEFAULT_TIMES[this.defaultTimesPosition];
    this.currentTime = Time.DEFAULT_TIMES[this.defaultTimesPosition];
  }

  sub30Sec(){
    if(this.locked){return}

    if(this.endsAt.getTime() - Date.now() < 30*1000){
      this.paused = true;
      this.currentTime = new Time(0,0,0);
    }
    else{
      this.endsAt = new Date(this.endsAt.getTime() - 30*1000);
      this.updateTime();
    }

    this.tick();
  }

  add30Sec(){
    if(this.locked){return}

    if(this.currentTime.isZero()){
      this.endsAt = new Date(Date.now() + 30*1000);
      this.currentTime = (new Time(0,0,30))
    }
    else{
      this.endsAt = new Date(this.endsAt.getTime() + 30*1000);
      this.updateTime();
    } 

    this.tick();
  }

  lockUnlock(){
    if(this.locked){
      this.locked = false;
    }
    else{
      this.locked = true;
    }
  }


}
