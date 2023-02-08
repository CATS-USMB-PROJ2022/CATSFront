import {Component, OnChanges, OnInit} from '@angular/core';
import {CallService} from '../../service/call.service';
import {CookieService} from 'ngx-cookie-service';
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {DataService} from "../../service/data.service";
import {ValueService} from "../../service/value.service";

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
  public percentageCom: number;
  public percentageOther: number;
  public labelsStatut: string[];
  public valuesStatut: number[];
  public nbSupSeuil: number;

  public labelsMotiveEndCall: string[];
  public valuesMotiveEndCall: number[];
  public threshold: number;

  constructor(private data: DataService, private values: ValueService, private CallService: CallService, public cookieService: CookieService) {
    this.nbCall = 0;
    this.averageWorkingCall = 0;
    this.averageCall = 0;
    this.nbDebordement= 0;
    this.percentageCom = 0;
    this.percentageOther = 0;
    this.threshold = 0.0;
    this.nbSupSeuil = 0;

    this.labelsStatut = [""];
    this.valuesStatut = [0];
    this.labelsMotiveEndCall = [""];
    this.valuesMotiveEndCall = [0];

    this.data.current.subscribe(value => this.initDataCalls());
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

  private initDataCalls() {
    this.CallService.postNumberCall().subscribe(data => {
      console.log(data);
      this.nbCall = data.nbrAppel;
      this.averageWorkingCall = Math.round(data.moyenneTempsTravail);
      this.averageCall = Math.round(data.moyenneTempsAttente);
      this.labelsStatut = data.labelsStatut;
      this.valuesStatut = data.valuesStatut;
      this.labelsMotiveEndCall = data.labelsCauseFin;
      this.valuesMotiveEndCall = data.valuesCauseFin;
      this.nbDebordement = data.nbDebordement;
      this.nbSupSeuil = data.nbSupSeuil;
      console.log(data.nbSupSeuil);

      if (this.cookieService.get("threshold") == "") {
        this.cookieService.set("threshold", this.averageCall.toString());
      }

      this.threshold = Number(this.cookieService.get("threshold"));
      this.applyThreshold(this.threshold.toString());

      this.calculatePercentages();

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

  private getSeuilCalls() {
    this.CallService.postNumberCall().subscribe(data => {
      console.table(data);
      this.nbSupSeuil = data.nbSupSeuil;
    });
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

  applyThreshold(value: string) {
    this.threshold = value ? Number(value) : this.averageCall;
    this.cookieService.set("threshold", value.toString());
    console.log(this.cookieService.get("threshold"));
    this.getSeuilCalls();
  }
}
