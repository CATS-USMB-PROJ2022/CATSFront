import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ChartConfiguration} from "chart.js";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import ChartDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-diagramme-repartition-abd-appel',
  templateUrl: './diagramme-repartition-abd-appel.component.html',
  styleUrls: ['./diagramme-repartition-abd-appel.component.css']
})
export class DiagrammeRepartitionAbdAppelComponent implements OnInit, OnDestroy, OnChanges {

  public plage: string;
  public labels:string[];
  public nbAppel:number[];
  public nbAbd:number[];
  public dataObservable: Subscription;
  public valeurObservable: Subscription;
  public BarChartData: any = {
    labels: [""],
    datasets: [
      {data: [0], label: "Nombre d'appel"},
      {data: [0], label: "Nombre d'abandon"}]
  };

  public BarChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        show: false
      }
    }
  }

  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.plage = "";
    this.labels = [""];
    this.nbAppel = [0];
    this.nbAbd = [0];
    this.valeurObservable=this.value.current.subscribe(_ => this.getData());
    this.dataObservable=this.data.current.subscribe(_ => this.getData());
  }

  ngOnInit(): void {
    this.getData();
    this.BarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          show: false
        }
      }
    }
  }

  ngOnDestroy(): void{
    this.dataObservable.unsubscribe();
    this.valeurObservable.unsubscribe();
  }

  ngOnChanges(): void {
    this.BarChartData = {
      labels: this.labels,
      datasets: [
        {data: this.nbAppel, label: "Nombre d'appel"},
        {data: this.nbAbd, label: "Nombre d'abandon"}]
    }
    this.BarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          show: false
        }
      }
    }
  }

  private getData(){
    this.PostService.postRepartitionAbandonAppel().subscribe((data: any) => {
      this.plage = data.plage;
      this.labels = data.labels;
      this.nbAppel = data.nbAppel;
      this.nbAbd = data.nbAbd;
      this.ngOnChanges();
    });
  }
}
