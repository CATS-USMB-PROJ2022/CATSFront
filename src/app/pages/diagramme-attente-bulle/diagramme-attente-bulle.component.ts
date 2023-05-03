import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  public attenteMoyenneAvantAbandon: number;
  public appelsDebordesAbandonnes: number;
  public labels: string[];
  public AttenteRepartition: number[][];
  public dataObservable: Subscription;
  public valeurObservable: Subscription;

  public bubbleChartPlugins = [ChartDataLabels];
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
    maintainAspectRatio: false,
    layout: {
      autoPadding: false,
    },
    clip: 10,
    scales: {
      x: {
        min: 0,
        ticks: {},
        title: {
          display: true,
          text: 'Nombre d\'appels'
        }
      },
      y: {
        min: 0,
        ticks: {},
        title: {
          display: true,
          text: 'Temps d\'attente (en secondes)'
        }
      },

    },
    plugins: {
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold',
          size: 16
        },
      },
      title: {
        display: true,
        text: "Taille de la bulle : nombre d'appels debordés"
      },
      legend: {
        display: false
      }
    },
    elements: {
      point: {
        backgroundColor: getRandomColor,
        radius: function(context) {
          const value = context.dataset.data[context.dataIndex];
          const size = context.chart.width;
          // @ts-ignore
          const base = Math.abs(value.v) / 100;
          return (size / 24) * base;
        }
      }
    }
  }

  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.labels = [""];
    this.AttenteRepartition = [[0, 0, 0]];
    this.attenteMoyenneAvantAbandon = 0.0;
    this.appelsDebordesAbandonnes = 0.0;

    this.dataObservable = this.value.current.subscribe(_ => this.getData());
    this.valeurObservable = this.data.current.subscribe(_ => this.getData());

  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    let ChartDatasets = [];
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
        this.labels = data.labels ?? [""];
        this.AttenteRepartition = data.values ?? [[0, 0, 0]];
        this.attenteMoyenneAvantAbandon = data.attenteMoyenneAvantAbandon;
        this.appelsDebordesAbandonnes = data.appelsDebordesAbandonnes;
        this.ngOnChanges();
      }
    )
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r},${g},${b},0.5)`;
}
