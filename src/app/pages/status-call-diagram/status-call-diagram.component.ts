import { Component, OnInit, OnChanges} from '@angular/core';
import {ChartData, ChartType} from "chart.js";
import { StatusCallService } from 'src/app/service/status_call.service';
import { CookieService } from 'ngx-cookie-service';
import {Time} from "@angular/common";
import {DataService} from "../../service/data.service";


const default_time_start: Time = {hours: 0, minutes: 0};
const default_time_end: Time = {hours: 23, minutes: 59};

@Component({
  selector: 'app-end-call-diagram',
  templateUrl: './status-call-diagram.component.html',
  styleUrls: ['./status-call-diagram.component.css']
})
export class StatusCallDiagramComponent implements OnInit, OnChanges {

  public label:string[];
  public statusCall:number[];
  public start_time:Time=default_time_start;
  public end_time:Time=default_time_end;

  constructor(private data: DataService, private StatusCallService: StatusCallService, public cookieService:CookieService) {

    this.label = [""];
    this.statusCall = [0];

    if (this.cookieService.get("start_time") == "") {
      this.cookieService.set("start_time_hours", this.start_time.hours.toString());
      this.cookieService.set("start_time_minutes", this.start_time.minutes.toString())
    }
    this.start_time.hours = Number(this.cookieService.get("start_time_hours"));
    this.start_time.minutes = Number(this.cookieService.get("start_time_minutes"));

    if (this.cookieService.get("end_time") == "") {
      this.cookieService.set("end_time_hours", this.end_time.hours.toString());
      this.cookieService.set("end_time_minutes", this.end_time.minutes.toString())
    }
    this.end_time.hours = Number(this.cookieService.get("end_time_hours"));
    this.end_time.minutes = Number(this.cookieService.get("end_time_minutes"));

    this.data.current.subscribe(_ => this.getDataStatus());
  }

  ngOnInit(): void {
    console.log(Number(this.cookieService.get("caisse")));
    this.data.current.subscribe(_ => this.getDataStatus());
    this.getDataStatus();
  }


  ngOnChanges(): void {
    console.log(this.statusCall);
      this.pieChartData = {
        labels: this.label,
        datasets: [{
          data: this.statusCall
        }]
      }

  }

  private getDataStatus() {
    let start_date=new Date(this.cookieService.get("start_date"));
    let end_date= new Date(this.cookieService.get("end_date"));

    let gt: string[] = JSON.parse(this.cookieService.get("gt"));
    let agences: string[] = JSON.parse(this.cookieService.get("agences"));
    let threshold: number = Number(this.cookieService.get("threshold"));

    this.StatusCallService.postStatusCall(this.getCookieCaisse(), start_date, end_date, this.start_time, this.end_time, gt, agences, threshold).subscribe(data => {
      this.label=data.label;
      this.statusCall=data.nbr;
      this.ngOnChanges()
    })

  }

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ["label"],
    datasets: [ {
      data: [0]
    } ]
  };

  public pieChartType: ChartType = 'pie';

  public getCookieCaisse() {
    return Number(this.cookieService.get("caisse"));
  }
}
