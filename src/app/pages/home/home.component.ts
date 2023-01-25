import {Component, /*Input,*/ OnChanges, OnInit} from '@angular/core';
import {CallService} from '../../service/call.service';
import {CookieService} from 'ngx-cookie-service';
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {DataService} from "../../service/data.service";
import {ValueService} from "../../service/value.service";

export interface Filtre {
  name: string;
  completed: boolean;
  subfiltres?: Filtre[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  public nbCall: number;
  public averageWorkingCall: number;
  public averageCall: number;
  public nbDebordement: number;
  // private label: string[];
  public percentageCom: number;
  public percentageOther: number;
  // public gtAppeleId: string[];
  // public gtAppele: string[];
  // public rubTypeNum: string[];
  public labelsStatut: string[];
  public valuesStatut: number[];
  public nbSupSeuil: number;

  public labelsMotiveEndCall: string[];
  public valuesMotiveEndCall: number[];
  // public start_date: Date;
  // public end_date: Date;
  // public start_time: Time;
  // public end_time: Time;
  public threshold: number;

  constructor(private data: DataService, private values: ValueService, private CallService: CallService, public cookieService: CookieService) {
    this.nbCall = 0;
    this.averageWorkingCall = 0;
    this.averageCall = 0;
    this.nbDebordement= 0;
    this.percentageCom = 0;
    this.percentageOther = 0;
    // this.label = [""];
    // this.start_date = default_date_start;
    // this.end_date = default_date_end;
    // this.start_time = default_time_start;
    // this.end_time = default_time_end;
    this.threshold = 0.0;
    this.nbSupSeuil = 0;

    if (this.cookieService.get("threshold") == "") {
      this.cookieService.set("threshold", this.threshold.toString());
    }
    this.threshold = Number(this.cookieService.get("threshold"));

    // this.gtAppeleId = [""];
    // this.gtAppele = [""];
    // this.rubTypeNum = [""];
    this.labelsStatut = [""];
    this.valuesStatut = [0];
    this.labelsMotiveEndCall = [""];
    this.valuesMotiveEndCall = [0];

    this.data.current.subscribe(_ => this.initDataCalls());
    this.values.current.subscribe(value => this.getDataCalls(value));
  }


  ngOnInit(): void {
    this.data.current.subscribe(_ => this.initDataCalls());
    this.initDataCalls();
  }

  ngOnChanges(): void {
    this.pieChartData = {
      labels: this.labelsStatut,
      datasets: [{
        data: this.valuesStatut
      }]
    };

    this.pieChartDataMotiveEndCall = {
      labels: this.labelsMotiveEndCall,
      datasets: [{
        data: this.valuesMotiveEndCall
      }]
    };
  }

  // miseJourGtAppel() {
  //   this.filtreGt = {
  //     name: 'GT APPELE',
  //     completed: true,
  //     subfiltres: this.getGtAppele(),
  //   };
  // }

  // miseJourAgences() {
  //   this.filtreAgence = {
  //     name: 'AGENCES',
  //     completed: true,
  //     subfiltres: this.getAgences(),
  //   };
  // }

  private initDataCalls() {
    this.CallService.postNumberCall(this.getCookieCaisse()).subscribe(data => {
      console.log(data);
      this.nbCall = data.nbrAppel;
      this.averageWorkingCall = Math.round(data.moyenneTempsTravail);
      this.averageCall = Math.round(data.moyenneTempsAttente);
      // this.gtAppeleId = data.gtAppeleId;
      // this.gtAppele = data.gtAppele;
      // this.rubTypeNum = data.rubTypenum;
      this.labelsStatut = data.labelsStatut;
      this.valuesStatut = data.valuesStatut;
      this.labelsMotiveEndCall = data.labelsCauseFin;
      this.valuesMotiveEndCall = data.valuesCauseFin;
      this.nbDebordement = data.nbDebordement;
      this.nbSupSeuil = data.nbSupSeuil;
      console.log(data.nbSupSeuil);

      this.calculatePercentages();

      // this.miseJourGtAppel();
      // this.miseJourAgences();
      this.ngOnChanges();
    })
  }

  private getDataCalls(value: { nbrAppel: number, moyenneTempsAttente: number, moyenneTempsTravail: number,
                                gtAppeleId: string[], gtAppele: string[], labelsStatut: string[], valuesStatut: number[],
                                labelsCauseFin: string[], valuesCauseFin: number[], nbDebordement: number, nbSupSeuil: number }) {
    console.table(value);
    this.nbCall = value.nbrAppel;
    this.averageCall = Math.round(value.moyenneTempsAttente);
    this.averageWorkingCall = Math.round(value.moyenneTempsTravail);
    // this.gtAppeleId = value.gtAppeleId;
    // this.gtAppele = value.gtAppele;
    this.labelsStatut = value.labelsStatut;
    this.valuesStatut = value.valuesStatut;
    this.labelsMotiveEndCall = value.labelsCauseFin;
    this.valuesMotiveEndCall = value.valuesCauseFin;
    this.nbDebordement = value.nbDebordement;
    this.nbSupSeuil = value.nbSupSeuil;

    this.calculatePercentages();

    this.ngOnChanges();
  }

  private calculatePercentages() {
    const numberCom = this.valuesStatut[0];
    const numberOther = this.valuesStatut[1];
    const totalcall = numberCom + numberOther;

    this.percentageCom = Math.round((numberCom / totalcall) * 100);
    this.percentageOther = Math.round((numberOther / totalcall) * 100);
  }

  // private getDataCalls( date_start: Date, date_end: Date, time_start: Time, time_end: Time, gt: string[] = [], agences: string[] = [], threshold: number = 0.0) {
  //   this.CallService.postNumberCall(this.getCookieCaisse(), date_start, date_end, time_start, time_end, gt, agences, threshold).subscribe(data => {
  //     console.log(data);
  //     this.nbCall = data.nbrAppel;
  //     this.averageCall = Math.round(data.moyenneTempsAttente);
  //     this.averageWorkingCall = Math.round(data.moyenneTempsTravail);
  //     this.gtAppeleId = data.gtAppeleId;
  //     this.gtAppele = data.gtAppele;
  //     this.labelsStatut = data.labelsStatut;
  //     this.valuesStatut = data.valuesStatut;
  //     this.labelsMotiveEndCall = data.labelsCauseFin;
  //     this.valuesMotiveEndCall = data.valuesCauseFin;
  //     this.nbDebordement = data.nbDebordement;
  //     this.nbSupSeuil = data.nbSupSeuil;
  //
  //     const numberCom = this.valuesStatut[0];
  //     const numberOther = this.valuesStatut[1];
  //     const totalcall = numberCom + numberOther;
  //
  //     this.percentageCom = Math.round((numberCom / totalcall) * 100);
  //     this.percentageOther = Math.round((numberOther / totalcall) * 100);
  //
  //     this.ngOnChanges();
  //   })
  // }

  private getSeuilCalls() {
    this.CallService.postNumberCall(this.getCookieCaisse()).subscribe(data => {
      console.table(data);
      this.nbSupSeuil = data.nbSupSeuil;
    });
  }

  // public getGtAppele(): Filtre[] {
  //   if (this.cookieService.get("gt") == "") this.cookieService.set("gt", "[]");
  //   let selectedGt = JSON.parse(this.cookieService.get("gt"));
  //
  //   let filtres: Filtre[] = [];
  //   console.log(this.gtAppele)
  //
  //   for (let index = 0; index < this.gtAppele.length; index++) {
  //     filtres[index] = {name: this.gtAppele[index], completed: selectedGt.includes(this.gtAppeleId[index])};
  //   }
  //   return filtres;
  // }
  //
  // public getAgences(): Filtre[] {
  //   if (this.cookieService.get("agences") == "") this.cookieService.set("agences", "[]");
  //   let selectedAgences = JSON.parse(this.cookieService.get("agences"));
  //
  //   let filtres: Filtre[] = [];
  //   console.log(this.rubTypeNum);
  //
  //   for (let index = 0; index < this.rubTypeNum.length; index++) {
  //     filtres[index] = {name: this.rubTypeNum[index], completed: selectedAgences.includes(this.rubTypeNum[index])};
  //   }
  //
  //   return filtres;
  // }

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

  public pieChartDataMotiveEndCall: ChartData<'pie', number[], string | string[]> = {
    labels: ["label"],
    datasets: [{
      data: [0]
    }]
  };

  public pieChartTypeMotiveEndCall: ChartType = 'pie';

  public pieChartOptionsMotiveEndCall: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    }
  };

  public getCookieCaisse() { return Number(this.cookieService.get("caisse")); }

  recupSeuil(value: string) {
    this.threshold = value ? Number(value) : this.averageCall;
    this.cookieService.set("threshold", value.toString());
    console.log(this.cookieService.get("threshold"));
  }

  applyThreshold() { this.getSeuilCalls(); }
}
