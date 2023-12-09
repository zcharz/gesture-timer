export class Time {
    public hours:number;
    public minutes:number;
    public seconds:number;
    public milliseconds: number;
    constructor(h:number, m:number, s:number){
        this.hours = h;
        this.minutes = m;
        this.seconds = s;
        this.milliseconds = 0;
    }
}
