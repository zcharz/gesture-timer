export class Time {
    public hours:number;
    public minutes:number;
    public seconds:number;
    public milliseconds: number;
    public static DEFAULT_TIMES: Time[] = [
        new Time(0,1,0),new Time(0,2,0),new Time(0,3,0),new Time(0,5,0),new Time(0,10,0),
        new Time(0,15,0),new Time(0,20,0),new Time(0,30,0),new Time(1,0,0), new Time(2,0,0)];

    constructor(h:number, m:number, s:number){
        this.hours = h;
        this.minutes = m;
        this.seconds = s;
        this.milliseconds = 0;
    }

    public toString(){
        return this.hours + "h " + this.minutes + "m " + this.seconds + "s";
    }
    public isZero(){
        return this.hours == 0 && this.minutes == 0 && this.seconds == 0;
    }

}
