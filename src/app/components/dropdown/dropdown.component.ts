import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {CallService} from "../../service/call.service";
import {Time} from "@angular/common";
import {DataService} from "../../service/data.service";

const default_date_start = new Date(0);
const default_date_end = new Date();
default_date_end.setFullYear(2023);

const default_time_start: Time = {hours: 0, minutes: 0};
const default_time_end: Time = {hours: 0, minutes: 0};

@Component({
  selector: 'caisse-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  public rubIdCaisse: number[];
  public caisse: string[];
  public nbrCaisse: number;
  public start_date: Date;
  public end_date: Date;
  public start_time: Time;
  public end_time: Time;
  selected = '-1';


  isOpen = false;

  constructor(private data: DataService, private CallService: CallService, public cookieService: CookieService) {
    this.rubIdCaisse = [0];
    this.caisse = [""];

    this.start_date = default_date_start;
    this.end_date = default_date_end;
    this.start_time = default_time_start;
    this.end_time = default_time_end;
    if (this.cookieService.get("caisse").length == 0) {
      this.cookieService.set("caisse", "-1");
    }
    this.nbrCaisse = Number(this.cookieService.get("caisse"));

    if (this.cookieService.get("start_date") == "") {
      this.cookieService.set("start_date", this.start_date.toString())
    }
    this.start_date = new Date(this.cookieService.get("start_date"));

    if (this.cookieService.get("end_date") == "") {
      this.cookieService.set("end_date", this.start_date.toString())
    }
    this.end_date = new Date(this.cookieService.get("end_date"));

    this.data.current.subscribe(_ => {});
  }

  ngOnInit(): void {
    this.initDataCalls(/*this.nbrCaisse, */this.start_date, this.end_date, this.start_time, this.end_time);
  }

  private initDataCalls(/*caisse: number, */date_start: Date, date_end: Date, time_start: Time, time_end: Time) {
    console.log(time_start, time_end);
    this.CallService.postNumberCall(Number(this.nbrCaisse), date_start, date_end, time_start, time_end, [], []).subscribe(data => {
      console.log(data);
      this.rubIdCaisse = data.rubIdCaisse;
      this.caisse = data.caisse;

      this.selected = this.cookieService.get("caisse");
    })
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  clickedOutside() {
    this.isOpen = false;
  }

  setSelected(selected: number) {
    this.selected = selected.toString();
    this.cookieService.set("caisse", this.selected);
    this.data.setCaisse(selected);
    // this.data.changeCaisse(selected);
    this.isOpen = false;
  }

  getSelectedLabel() {
    return this.getCaisses().find(caisse => caisse.id.toString() == this.selected)?.label;
  }

  getCaisses() {
    let caisses = [];

    for (let i = 0; i < this.rubIdCaisse.length; i++) {
      caisses.push({id: this.rubIdCaisse[i], label: this.caisse[i]});
    }

    return caisses;
  }
}
