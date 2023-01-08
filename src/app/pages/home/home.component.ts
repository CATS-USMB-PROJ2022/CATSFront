import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CallService} from '../../service/call.service';
import {CookieService} from 'ngx-cookie-service';
import {FormControl, FormGroup} from "@angular/forms";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {Time} from "@angular/common";
import {DateRange} from "@angular/material/datepicker";
import {DataService} from "../../service/data.service";

export interface Filtre {
  name: string;
  completed: boolean;
  subfiltres?: Filtre[];
}

const default_date_start = new Date(0);
const default_date_end = new Date();
default_date_end.setFullYear(2023);

const default_time_start: Time = {hours: 0, minutes: 0};
const default_time_end: Time = {hours: 23, minutes: 59};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  @Input() selectedRangeValue: DateRange<Date> | undefined;

  public nbCall: number;
  public averageWorkingCall: number;
  public averageCall: number;
  private label: string[];
  public percentageCom: number;
  public percentageOther: number;
  public gtAppeleId: string[];
  public gtAppele: string[];
  public rubTypeNum: string[];
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
  public filtreGt: Filtre;
  public filtreAgence: Filtre;

  constructor(private data: DataService, private CallService: CallService, public cookieService: CookieService) {
    this.nbCall = 0;
    this.averageWorkingCall = 0;
    this.averageCall = 0;
    this.percentageCom = 0;
    this.percentageOther = 0;
    this.label = [""];
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

    this.gtAppeleId = [""];
    this.gtAppele = [""];
    this.rubTypeNum = [""];
    this.labelsStatut = [""];
    this.valuesStatut = [0];
    //Parties Filtres
    this.filtreGt = {
      name: 'GT APPELE',
      completed: true,
      subfiltres: this.getGtAppele(),
    };

    this.filtreAgence = {
      name: 'AGENCE',
      completed: true,
      subfiltres: this.getAgences(),
    };


    this.data.current.subscribe(_ => this.initDataCalls( this.start_date, this.end_date, this.start_time, this.end_time));
    //this.data.currentCaisse.subscribe(caisse => this.getDataCalls(caisse, this.start_date, this.end_date, this.start_time, this.end_time));
  }


  ngOnInit(): void {
    this.data.current.subscribe(_ => this.initDataCalls( this.start_date, this.end_date, this.start_time, this.end_time));
    //this.data.currentCaisse.subscribe(caisse => this.getDataCalls(caisse, this.start_date, this.end_date, this.start_time, this.end_time));
    this.initDataCalls(this.start_date, this.end_date, this.start_time, this.end_time);
    //this.getDataStatus();
  }

  ngOnChanges(): void {
    this.pieChartData = {
      labels: this.labelsStatut,
      datasets: [{
        data: this.valuesStatut
      }]
    };
  }

  miseJourGtAppel() {
    //Parties Filtres
    this.filtreGt = {
      name: 'GT APPELE',
      completed: true,
      subfiltres: this.getGtAppele(),
    };
  }

  miseJourAgences() {
    this.filtreAgence = {
      name: 'AGENCES',
      completed: true,
      subfiltres: this.getAgences(),
    };
  }

  private initDataCalls( date_start: Date, date_end: Date, time_start: Time, time_end: Time, gt: string[] = [], agences: string[] = []) {
    console.log(time_start, time_end);
    this.CallService.postNumberCall(this.getCookieCaisse(), date_start, date_end, time_start, time_end, gt, agences).subscribe(data => {
      console.log(data);
      this.nbCall = data.nbrAppel;
      this.averageWorkingCall = Math.round(data.moyenneTempsAttente);
      this.averageCall = Math.round(data.moyenneTempsTravail);
      this.gtAppeleId = data.gtAppeleId;
      this.gtAppele = data.gtAppele;
      this.rubTypeNum = data.rubTypenum;
      this.labelsStatut = data.labelsStatut;
      this.valuesStatut = data.valuesStatut;

      const numberCom = this.valuesStatut[0];
      const numberOther = this.valuesStatut[1];
      const totalcall = numberCom + numberOther;

      this.percentageCom = Math.round((numberCom / totalcall) * 100);
      this.percentageOther = Math.round((numberOther / totalcall) * 100);


      this.miseJourGtAppel();
      this.miseJourAgences();
      this.ngOnChanges();
    })
  }

  private getDataCalls( date_start: Date, date_end: Date, time_start: Time, time_end: Time, gt: string[] = [], agences: string[] = []) {

    this.CallService.postNumberCall(this.getCookieCaisse(), date_start, date_end, time_start, time_end, gt, agences).subscribe(data => {
      console.log(data);
      this.nbCall = data.nbrAppel;
      this.averageWorkingCall = Math.round(data.moyenneTempsAttente);
      this.averageCall = Math.round(data.moyenneTempsTravail);
      this.gtAppeleId = data.gtAppeleId;
      this.gtAppele = data.gtAppele;
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

    //const start = this.selectedRangeValue?.start;
    //const end = this.selectedRangeValue?.end;


  }

  public recupHoraire() {
    this.start_time = this.horaires.value.start ? this.horaires.value.start : default_time_start;
    this.end_time = this.horaires.value.end ? this.horaires.value.end : default_time_end;

    this.cookieService.set("start_time_hours", this.start_time.hours.toString());
    this.cookieService.set("start_time_minutes", this.start_time.minutes.toString())

    this.cookieService.set("end_time_hours", this.end_time.hours.toString());
    this.cookieService.set("end_time_minutes", this.end_time.minutes.toString())
  }

  applyDateTime() {
    this.getDataCalls(this.start_date, this.end_date, this.start_time, this.end_time);
  }


  public getGtAppele(): Filtre[] {
    if (this.cookieService.get("gt") == "") {
      this.cookieService.set("gt", "[]");
    }
    let selectedGt = JSON.parse(this.cookieService.get("gt"));

    let filtres: Filtre[] = [];
    console.log(this.gtAppele)

    for (let index = 0; index < this.gtAppele.length; index++) {
      filtres[index] = {name: this.gtAppele[index], completed: selectedGt.includes(this.gtAppeleId[index])};
    }
    return filtres;
  }

  public getAgences(): Filtre[] {
    if (this.cookieService.get("agences") == "") {
      this.cookieService.set("agences", "[]");
    }
    let selectedAgences = JSON.parse(this.cookieService.get("agences"));

    let filtres: Filtre[] = [];
    console.log(this.rubTypeNum);

    for (let index = 0; index < this.rubTypeNum.length; index++) {
      filtres[index] = {name: this.rubTypeNum[index], completed: selectedAgences.includes(this.rubTypeNum[index])};
    }

    return filtres;
  }

  public updateFiltres() {
    let filtresGt = this.filtreGt.subfiltres ? this.filtreGt.subfiltres : [];
    let gt: string[];
    gt = [];

    let filtresAgence = this.filtreAgence.subfiltres ? this.filtreAgence.subfiltres : [];
    let agences: string[];
    agences = [];

    for (let i = 0; i < filtresGt.length; i++){
      let id = this.gtAppeleId[i];
      let {completed} = filtresGt[i];
      if (completed) {
        gt.push(id);
      }
    }

    for (let {name, completed} of filtresAgence) {
      if (completed) {
        agences.push(name);
      }
    }

    this.cookieService.set("gt", JSON.stringify(gt));
    this.cookieService.set("agences", JSON.stringify(agences));

    this.getDataCalls(this.start_date, this.end_date, this.start_time, this.end_time, gt, agences);
  }

    setGtSelected() {
    this.setAllAgences(false);
    // this.updateFiltres();
  }

  setAgenceSelected() {
    this.setAllGt(false);
    // this.updateFiltres();
  }

  setAllGt(completed: boolean) {
    if (this.filtreGt.subfiltres == null) {
      return;
    }
    this.filtreGt.subfiltres.forEach(t => (t.completed = completed));
    // this.updateFiltres();
  }

  setAllAgences(completed: boolean) {
    if (this.filtreAgence.subfiltres == null) {
      return;
    }
    this.filtreAgence.subfiltres.forEach(t => (t.completed = completed));
    // this.updateFiltres();
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

  public getCookieCaisse() {
    return Number(this.cookieService.get("caisse"));
  }
}
