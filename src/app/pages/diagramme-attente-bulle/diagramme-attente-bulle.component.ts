import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {Subscription} from "rxjs";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";

@Component({
  selector: 'app-diagramme-attente-bulle',
  templateUrl: './diagramme-attente-bulle.component.html',
  styleUrls: ['./diagramme-attente-bulle.component.css']
})
export class DiagrammeAttenteBulleComponent implements OnInit, OnDestroy, OnChanges {

  public labels: string[];
  public AttenteRepartition: number[][];
  public dataObservable: Subscription;
  public valeurObservable: Subscription;
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartData: ChartData<'bubble'> = {
    labels: [],
    datasets: [ {
      data: [
        { x: 0, y: 0, r: 0 },
      ],
      label: '',
    } ]
  };

  public bubbleChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        min: 0,
        ticks: {}
      },
      y: {
        min: 0,
        ticks: {}
      },
    },
    plugins: {
      legend: {
        display: false
      },

    },
  }

  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.labels = [""];
    this.AttenteRepartition = [[0, 0, 0]];

    this.dataObservable = this.value.current.subscribe(_ => this.getData());
    this.valeurObservable = this.data.current.subscribe(_ => this.getData());
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    let ChartDatasets = [];
    let color;
    for(let i = 0; i < this.AttenteRepartition.length; i++){
      ChartDatasets.push({
        data: [
          { x: this.AttenteRepartition[i][0], y: this.AttenteRepartition[i][1], r: this.AttenteRepartition[i][2] },
        ],
        label: this.labels[i],

      })
    }
    this.bubbleChartData = {
      datasets: ChartDatasets
    };
  }

  ngOnDestroy(): void {
    this.dataObservable.unsubscribe();
    this.valeurObservable.unsubscribe();
  }

  private getData(){
    this.PostService.postAttenteRepartitionAppel().subscribe(
      (data) => {
        if(!data) return;
        this.labels = data.labels;
        this.AttenteRepartition = data.values;
        this.ngOnChanges();
      }
    )
  }
}
