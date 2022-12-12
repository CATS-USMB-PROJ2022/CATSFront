import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CallService} from '../../service/call.service';
import {StatusCallService} from '../../service/status_call.service';
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
  public averageCall: number;
  private label: string[];
  private statusCall: number[];
  public percentageCom: number;
  public percentageOther: number;
  /*public rubIdCaisse: number[];
  public caisse: string[];
  selected = 'All';*/
  //nbrCaisse: number;
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

  constructor(private data: DataService, private CallService: CallService, private StatusCallService: StatusCallService, public cookieService: CookieService) {
    this.nbCall = 0;
    this.averageCall = 0;
    this.percentageCom = 0;
    this.percentageOther = 0;
    this.label = [""];
    this.statusCall = [0];
    /*this.rubIdCaisse = [0];
    this.caisse = [""];*/
    this.start_date = default_date_start;
    this.end_date = default_date_end;
    this.start_time = default_time_start;
    this.end_time = default_time_end;


    if (this.cookieService.get("start_date") == "") {
      this.cookieService.set("start_date", this.start_date.toString())
    }
    this.start_date = new Date(this.cookieService.get("start_date"));

    if (this.cookieService.get("end_date") == "") {
      this.cookieService.set("end_date", this.end_date.toString())
    }
    this.end_date = new Date(this.cookieService.get("end_date"));

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

    console.log("NOTICE ME DAIGOOOOOOOOOOOOOOOOOOOOOOOOOOO" + this.start_time.hours+ this.start_time.minutes);
    console.log("NOTICE ME 2" + + this.end_time.hours+ this.end_time.minutes);

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


    this.data.current.subscribe(_ => this.initDataCalls(this.getCookieCaisse(), this.start_date, this.end_date, this.start_time, this.end_time));
    //this.data.currentCaisse.subscribe(caisse => this.getDataCalls(caisse, this.start_date, this.end_date, this.start_time, this.end_time));
  }


  ngOnInit(): void {
    this.data.current.subscribe(_ => this.initDataCalls(this.getCookieCaisse(), this.start_date, this.end_date, this.start_time, this.end_time));
    //this.data.currentCaisse.subscribe(caisse => this.getDataCalls(caisse, this.start_date, this.end_date, this.start_time, this.end_time));
    this.initDataCalls(this.getCookieCaisse(), this.start_date, this.end_date, this.start_time, this.end_time);
    //this.getDataStatus();
    console.log("ID CAISSE COOKI:" + this.cookieService.get("caisse"));
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

  private initDataCalls(caisse: number, date_start: Date, date_end: Date, time_start: Time, time_end: Time, gt: string[] = []) {
    console.log(time_start, time_end);
    this.CallService.postNumberCall(this.getCookieCaisse(), date_start, date_end, time_start, time_end, gt, []).subscribe(data => {
      console.log(data);
      this.nbCall = data.nbrAppel;
      this.averageCall = Math.round(data.moyenneTempsAttente);
      /*this.rubIdCaisse = data.rubIdCaisse;
      this.caisse = data.caisse;*/
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

      /*this.selected=this.cookieService.get("caisse");*/

      this.miseJourGtAppel();
      this.miseJourAgences();
      this.ngOnChanges();
    })
  }

  private getDataCalls(caisse: number, date_start: Date, date_end: Date, time_start: Time, time_end: Time, gt: string[] = [], agences: string[] = []) {
    //this.nbrCaisse = caisse;

    this.CallService.postNumberCall(this.getCookieCaisse(), date_start, date_end, time_start, time_end, gt, agences).subscribe(data => {
      console.log(data);
      this.nbCall = data.nbrAppel;
      this.averageCall = Math.round(data.moyenneTempsAttente);
      /*this.rubIdCaisse = data.rubIdCaisse;
      this.caisse = data.caisse;*/
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

  public recupRange() {
    const start = this.selectedRangeValue?.start;
    const end = this.selectedRangeValue?.end;

    //@ts-ignore
    this.cookieService.set("start_date", start.toString());
    //@ts-ignore
    this.cookieService.set("end_date", end.toString());

    if ((start != default_date_start) && (end != default_date_end)) {
      if (start == null || end == null) {
        this.start_date = default_date_start;
        this.end_date = default_date_end;
      } else {
        this.start_date = start;
        this.end_date = end;
      }
    } else {

    }

    this.getDataCalls(/*this.nbrCaisse*/0, this.start_date, this.end_date, this.start_time, this.end_time);
  }

  selectedChange(m: Date) {

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

    //@ts-ignore
    this.cookieService.set("start_time", this.start_time.toString());
    //@ts-ignore
    this.cookieService.set("end_time", this.end_time.toString());
  }

  applyDateTime() {
    this.getDataCalls(/*this.nbrCaisse*/this.getCookieCaisse(), this.start_date, this.end_date, this.start_time, this.end_time);
  }


  public getGtAppele(): Filtre[] {
    let filtres: Filtre[] = [];
    console.log(this.gtAppele)

    for (let index = 0; index < this.gtAppele.length; index++) {
      filtres[index] = {name: this.gtAppele[index], completed: false};
    }
    return filtres;
  }

  public getAgences(): Filtre[] {
    let filtres: Filtre[] = [];
    console.log(this.rubTypeNum);

    for (let index = 0; index < this.rubTypeNum.length; index++) {
      filtres[index] = {name: this.rubTypeNum[index], completed: false};
    }

    return filtres;
  }

  public updateFiltres() {
    let filtresGt = [this.filtreGt];
    let gt: string[];
    gt = [];

    let filtresAgence = [this.filtreAgence];
    let agences: string[];
    agences = [];

    for (let {name, completed} of filtresGt.slice(1)) {
      if (completed) {
        gt.push(name);
      }
    }

    for (let {name, completed} of filtresAgence.slice(1)) {
      if (completed) {
        agences.push(name);
      }
    }

    this.getDataCalls(/*this.nbrCaisse*/0, this.start_date, this.end_date, this.start_time, this.end_time, gt, agences);
  }

  //allComplete: boolean = false;

  setGtSelected() {
    this.setAllAgences(false);
    //this.allComplete = this.filtreGt.subfiltres != null && this.filtreGt.subfiltres.every(t => t.completed);
    // this.updateFiltres();
  }

  setAgenceSelected() {
    this.setAllGt(false);
    //this.allComplete = this.filtreAgence.subfiltres != null && this.filtreAgence.subfiltres.every(t => t.completed);
    // this.updateFiltres();
  }

  // someComplete(): boolean {
  //   if (this.filtreGt.subfiltres == null) {
  //     return false;
  //   }
  //   return this.filtreGt.subfiltres.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  setAllGt(completed: boolean) {
    //this.allComplete = completed;
    if (this.filtreGt.subfiltres == null) {
      return;
    }
    this.filtreGt.subfiltres.forEach(t => (t.completed = completed));
    // this.updateFiltres();
  }

  setAllAgences(completed: boolean) {
    //this.allComplete = completed;
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
    /*if (this.cookieService.get("caisse").length != 0) {
      this.cookieService.set("caisse", "-1");
    }
    this.nbrCaisse =*/
    return Number(this.cookieService.get("caisse"));
  }
}
