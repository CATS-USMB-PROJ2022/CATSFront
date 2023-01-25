import {Component, Input, OnInit} from '@angular/core';
import {CallService} from "../../service/call.service";
import {CookieService} from "ngx-cookie-service";
import {ValueService} from "../../service/value.service";
import {DateRange} from "@angular/material/datepicker";
import {Time} from "@angular/common";
import {FormControl, FormGroup} from "@angular/forms";

const default_date_start = new Date(0);
const default_date_end = new Date();
default_date_end.setFullYear(2023);

const default_time_start: Time = {hours: 0, minutes: 0};
const default_time_end: Time = {hours: 23, minutes: 59};

@Component({
  selector: 'date-time-filter',
  templateUrl: './date-time-filter.component.html',
  styleUrls: ['./date-time-filter.component.css']
})
export class DateTimeFilterComponent implements OnInit {
  @Input() selectedRangeValue: DateRange<Date> | undefined;

  public start_date: Date;
  public end_date: Date;
  public start_time: Time;
  public end_time: Time;

  constructor(private callService: CallService, private cookieService: CookieService, private valueService: ValueService) {
    this.start_date = default_date_start;
    this.end_date = default_date_end;
    this.start_time = default_time_start;
    this.end_time = default_time_end;

    if (this.cookieService.get("start_date") == "") {
      this.cookieService.set("start_date", this.start_date.toString());
    }
    this.start_date = new Date(this.cookieService.get("start_date"));

    if (this.cookieService.get("end_date") == "") {
      this.cookieService.set("end_date", this.end_date.toString());
    }
    this.end_date = new Date(this.cookieService.get("end_date"));

    if (this.cookieService.get("start_time") == "") {
      this.cookieService.set("start_time_hours", this.start_time.hours.toString());
      this.cookieService.set("start_time_minutes", this.start_time.minutes.toString());
    }
    this.start_time.hours = Number(this.cookieService.get("start_time_hours"));
    this.start_time.minutes = Number(this.cookieService.get("start_time_minutes"));

    if (this.cookieService.get("end_time") == "") {
      this.cookieService.set("end_time_hours", this.end_time.hours.toString());
      this.cookieService.set("end_time_minutes", this.end_time.minutes.toString());
    }
    this.end_time.hours = Number(this.cookieService.get("end_time_hours"));
    this.end_time.minutes = Number(this.cookieService.get("end_time_minutes"));
  }

  ngOnInit(): void {

  }

  horaires = new FormGroup({
    start: new FormControl<Time | null>(null),
    end: new FormControl<Time | null>(null),
  });

  recupDate(m: Date) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      this.selectedRangeValue = end < start ? new DateRange<Date>(end, start) : new DateRange<Date>(start, end);
      //@ts-ignore
      this.cookieService.set("start_date", start.toString());
      //@ts-ignore
      this.cookieService.set("end_date", end.toString());
    }

    this.start_date = this.selectedRangeValue.start ?? default_date_start;
    this.end_date = this.selectedRangeValue.end ?? default_date_end;
  }

  public recupHoraire() {
    this.start_time = this.horaires.value.start ?? default_time_start;
    this.end_time = this.horaires.value.end ?? default_time_end;

    this.cookieService.set("start_time_hours", this.start_time.hours.toString());
    this.cookieService.set("start_time_minutes", this.start_time.minutes.toString())

    this.cookieService.set("end_time_hours", this.end_time.hours.toString());
    this.cookieService.set("end_time_minutes", this.end_time.minutes.toString())
  }

  applyDateTime() {
    this.getDataCalls();
  }

  private getDataCalls() {
    this.callService.postNumberCall().subscribe(data => {
      this.valueService.setValues(data);
    })
  }
}
