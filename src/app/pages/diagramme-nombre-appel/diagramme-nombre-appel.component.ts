import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-diagramme-nombre-appel',
  templateUrl: './diagramme-nombre-appel.component.html',
  styleUrls: ['./diagramme-nombre-appel.component.css']
})
export class DiagrammeNombreAppelComponent implements OnInit, OnDestroy, OnChanges {
  public plage: string;
  public labels:string[];
  public repartitionAppel:number[];
  public dataObservable: Subscription;
  public valeurObservable: Subscription;
  public BarChartData: any = {
    labels: [""],
    datasets: [{data: [0], label: "Nombre d'appel"}]
  };

  public BarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  }

  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.plage = "";
    this.labels = [""];
    this.repartitionAppel = [0];
    this.valeurObservable=this.value.current.subscribe(_ => this.getData());
    this.dataObservable=this.data.current.subscribe(_ => this.getData());
  }

  ngOnInit(): void {
    this.getData();
  }
  ngOnChanges(): void {
    this.BarChartData = {
      labels: this.labels,
      datasets: [{
        data: this.repartitionAppel,
        label: "Nombre d'appel"
      }]
    }
  }

  ngOnDestroy(): void {
    this.dataObservable.unsubscribe();
    this.valeurObservable.unsubscribe();
  }
  private getData(){
    this.PostService.postDateRepartitionAppel().subscribe((data: any) => {
      if(!(data))return ;
      this.repartitionAppel = data.values;
      this.labels = data.labels;
      this.plage = data.plage;
      this.ngOnChanges();
    });
  }

}
