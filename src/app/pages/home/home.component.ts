import {Component, OnChanges, OnInit} from '@angular/core';
import {CallService} from './../../service/call.service';
import {StatusCallService} from './../../service/status_call.service';
import {CookieService} from 'ngx-cookie-service';
import {FormControl, FormGroup} from "@angular/forms";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {Time} from "@angular/common";

export interface Filtre {
  name: string;
  completed: boolean;
  subfiltres?: Filtre[];
}

const default_date_start = new Date(0);
const default_date_end = new Date();
default_date_end.setFullYear(2023);

const default_time_start: Time = { hours: 0, minutes: 0 };
const default_time_end: Time = { hours: 0, minutes: 0 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  public nbCall: number;
  public averageCall: number;
  private label: string[];
  private statusCall: number[];
  public percentageCom: number;
  public percentageOther: number;
  public caisses: number[];
  selected = 'All';
  nbrCaisse: number;
  public gtAppele: string[];
  public labelsStatut: string[];
  public valuesStatut: number[];
  public start_date: Date;
  public end_date: Date;
  public start_time: Time;
  public end_time: Time;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  horaires = new FormGroup({
    start: new FormControl<Time | null>(null),
    end: new FormControl<Time | null>(null),
  });
  public filtre: Filtre;


  constructor(private CallService: CallService, private StatusCallService: StatusCallService, public cookieService: CookieService) {
    this.nbCall = 0;
    this.averageCall = 0;
    this.percentageCom = 0;
    this.percentageOther = 0;
    this.label = [""];
    this.statusCall = [0];
    this.caisses = [0];
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

    this.gtAppele = [""];
    this.labelsStatut = [""];
    this.valuesStatut = [0];
    //Parties Filtres
    this.filtre = {
      name: 'GT APPELE',
      completed: true,
      subfiltres: this.getGtAppele(),
    };

  }


  ngOnInit(): void {
    this.initDataCalls(this.nbrCaisse, this.start_date, this.end_date, this.start_time, this.end_time);
    //this.getDataStatus();
  }

  ngOnChanges(): void {
    this.pieChartData = {
      labels: this.labelsStatut,
      datasets: [{
        data: this.valuesStatut
      }]
    }

  }

  miseJourGtAppel() {
    //Parties Filtres
    this.filtre = {
      name: 'GT APPELE',
      completed: true,
      subfiltres: this.getGtAppele(),
    };
  }


  private initDataCalls(caisse: number, date_start: Date, date_end: Date, time_start: Time, time_end: Time, gt: string[] = []) {
    this.CallService.postNumberCall(caisse, date_start, date_end, time_start, time_end, gt).subscribe(data => {
      console.log(data);
      this.nbCall = data.nbrAppel;
      this.averageCall = Math.round(data.moyenneTempsAttente);
      this.caisses = data.caisses;
      this.gtAppele = data.gtAppeleId;
      this.labelsStatut = data.labelsStatut;
      this.valuesStatut = data.valuesStatut;

      const numberCom = this.valuesStatut[0];
      const numberOther = this.valuesStatut[1];
      const totalcall = numberCom + numberOther;

      this.percentageCom = Math.round((numberCom / totalcall) * 100);
      this.percentageOther = Math.round((numberOther / totalcall) * 100);

      this.miseJourGtAppel();
      this.ngOnChanges();
    })
  }

  private getDataCalls(caisse: number, date_start: Date, date_end: Date, time_start: Time, time_end: Time, gt: string[] = []) {
    this.CallService.postNumberCall(caisse, date_start, date_end, time_start, time_end, gt).subscribe(data => {
      console.log(data);
      this.nbCall = data.nbrAppel;
      this.averageCall = Math.round(data.moyenneTempsAttente);
      this.caisses = data.caisses;
      this.gtAppele = data.gtAppeleId;
      this.labelsStatut = data.labelsStatut;
      this.valuesStatut = data.valuesStatut;

      const numberCom = this.valuesStatut[0];
      const numberOther = this.valuesStatut[1];
      const totalcall = numberCom + numberOther;

      this.percentageCom = Math.round((numberCom / totalcall) * 100);
      this.percentageOther = Math.round((numberOther / totalcall) * 100);

      this.ngOnChanges();
    })
  }

  public recupCaisse() {
    this.cookieService.set("caisse", this.selected);
    if (this.selected != "All") {
      this.nbrCaisse = Number(this.selected);
    } else {
      this.nbrCaisse = -1;
    }
    this.initDataCalls(this.nbrCaisse, this.start_date, this.end_date, this.start_time, this.end_time);
    //this.getDataStatus();
  }

  public recupRange() {

    //@ts-ignore
    this.cookieService.set("start_date", new Date(this.range.value.start).toString());
    //@ts-ignore
    this.cookieService.set("end_date", new Date(this.range.value.end).toString());
    if ((this.range.value.start != default_date_start) && (this.range.value.end != default_date_end)) {
      if (this.range.value.start == null || this.range.value.end == null) {
        this.start_date = default_date_start;
        this.end_date=default_date_end;
        this.getDataCalls(this.nbrCaisse, default_date_start, default_date_end, default_time_start, default_time_end);
      } else {
        this.getDataCalls(this.nbrCaisse, this.range.value.start, this.range.value.end, this.start_time, this.end_time);
        this.start_date = this.range.value.start;
        this.end_date = this.range.value.end;
      }
    } else {
      this.getDataCalls(this.nbrCaisse, default_date_start, default_date_end, default_time_start, default_time_end);
    }
  }

  public recupHoraire() {
    this.start_time = this.horaires.value.start ? this.horaires.value.start : default_time_start;
    this.end_time = this.horaires.value.end ? this.horaires.value.end : default_time_end;

    //@ts-ignore
    this.cookieService.set("start_time", this.start_time.toString());
    //@ts-ignore
    this.cookieService.set("end_time", this.end_time.toString());

    this.getDataCalls(this.nbrCaisse, this.start_date, this.end_date, this.start_time, this.end_time);
  }


  public getGtAppele(): Filtre[] {
    let filtres: Filtre[] = [];
    console.log(this.gtAppele)

    for (let index = 0; index < this.gtAppele.length; index++) {
      filtres[index] = { name: this.gtAppele[index], completed: false };
    }
    return filtres;
  }

  public updateGtAppel() {
    let filtres = [this.filtre];
    let gt: string[];
    gt = [];

    for (let {name, completed} of filtres) {
      if (completed) {
        gt.push(name);
      }
    }

    this.getDataCalls(this.nbrCaisse, this.start_date, this.end_date, this.start_time, this.end_time, gt);
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.filtre.subfiltres != null && this.filtre.subfiltres.every(t => t.completed);
    this.updateGtAppel();
  }

  someComplete(): boolean {
    if (this.filtre.subfiltres == null) {
      return false;
    }
    return this.filtre.subfiltres.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.filtre.subfiltres == null) {
      return;
    }
    this.filtre.subfiltres.forEach(t => (t.completed = completed));
    this.updateGtAppel();
  }

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ["label"],
    datasets: [{
      data: [0]
    }]
  };

  public pieChartType: ChartType = 'pie';

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    }
  };
}
