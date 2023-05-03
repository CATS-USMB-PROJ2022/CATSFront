import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {ChartConfiguration} from "chart.js";
import {Rouge, Vert} from "../../../utils";

@Component({
  selector: 'app-diagramme-nombre-appel',
  templateUrl: './diagramme-nombre-appel.component.html',
  styleUrls: ['./diagramme-nombre-appel.component.css']
})
export class DiagrammeNombreAppelComponent implements OnInit, OnDestroy, OnChanges {
  public plage: string;
  public labels: string[];
  public nbAppel: number[];
  public nbAbd: number[];
  public dataObservable: Subscription;
  public valeurObservable: Subscription;
  public BarChartData: any = {
    labels: [""],
    datasets: [
      {data: [0], label: "Nombre d'appels"},
      {data: [0], label: "Nombre d'abandons"}
    ]
  };

  public BarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false
      }
    }
  }

  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.plage = "";
    this.labels = [""];
    this.nbAppel = [0];
    this.nbAbd = [0];
    this.valeurObservable = this.value.current.subscribe(_ => this.getData());
    this.dataObservable = this.data.current.subscribe(_ => this.getData());
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    this.BarChartData = {
      labels: this.labels,
      datasets: [
        {data: this.nbAppel, label: "Nombre d'appels", backgroundColor: Vert},
        {data: this.nbAbd, label: "Nombre d'abandons", backgroundColor: Rouge},
      ]
    }
  }

  ngOnDestroy(): void {
    this.dataObservable.unsubscribe();
    this.valeurObservable.unsubscribe();
  }

  private getData() {
    this.PostService.postRepartitionAbandonAppel().subscribe((data: any) => {
      if (!(data)) return;
      this.plage = data.plage;
      this.labels = data.labels;
      this.nbAppel = data.nbAppel;
      this.nbAbd = data.nbAbd;
      this.ngOnChanges();
    });
  }

}
