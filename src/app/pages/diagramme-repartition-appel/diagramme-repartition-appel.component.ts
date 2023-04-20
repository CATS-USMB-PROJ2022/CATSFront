import {Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {PostService} from "../../service/post.service";
import {ValeursService} from "../../service/valeurs.service";
import {Rouge, Turquoise, Vert} from "../../../utils";
import { Subscription } from 'rxjs';

@Component({
  selector: 'diagramme-repartition-appel',
  templateUrl: './diagramme-repartition-appel.component.html',
  styleUrls: ['./diagramme-repartition-appel.component.css']
})
export class DiagrammeRepartitionAppelComponent implements OnInit, OnChanges, OnDestroy {
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Attributs ////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  public labels: string[];
  public repartitionAppel: number[][];
  public dataObservable: Subscription;
  public valeurObservable: Subscription;

  public stackedBarChartData: any = {
    labels: ["label"],
    datasets: [{
      label: "Temps d'attente",
      data: [0],
      backgroundColor: Rouge,
    }, {
      label: "Temps de mise en garde",
      data: [0],
      backgroundColor: Turquoise,
    }, {
      label: "Temps de communication",
      data: [0],
      backgroundColor: Vert,
    }]
  };

  public stackedBarChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        min: 0,
        max: 100,
        stacked: true
      }
    },
    plugins: {
      datalabels: {
        show:false
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructeurs ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.labels = [""];
    this.repartitionAppel = [[0, 0, 0]];


    this.valeurObservable=this.value.current.subscribe(_ => this.getData());
    this.dataObservable=this.data.current.subscribe(_ => this.getData());
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    this.stackedBarChartData = {
      labels: this.labels,
      datasets: [{
        label: "Temps d'attente",
        data: this.repartitionAppel.map(appel => appel[0]),
        backgroundColor: Rouge,
      }, {
        label: "Temps de mise en garde",
        data: this.repartitionAppel.map(appel => appel[1]),
        backgroundColor: Turquoise,
      }, {
        label: "Temps de communication",
        data: this.repartitionAppel.map(appel => appel[2]),
        backgroundColor: Vert,
      }]
    };
  }
  ngOnDestroy(): void {
   this.dataObservable.unsubscribe();
   this.valeurObservable.unsubscribe();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Getters //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  private getData() {

    this.PostService.postRepartitionAppel().subscribe(data => {
      if(!(data))return ;
      this.labels = data.labels;
      this.repartitionAppel = data.values;
      this.ngOnChanges();
    });
  }
}
