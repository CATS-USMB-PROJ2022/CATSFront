import {Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {PostService} from "../../service/post.service";
import {ValeursService} from "../../service/valeurs.service";
import {Rouge, Turquoise, Vert} from "../../../utils";
import {Subscription} from 'rxjs';
import {MatSelectChange} from "@angular/material/select";

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

  public utiliserPourcentages: boolean;
  public unite: 'pourcentages' | 'secondes' | 'minutes';

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
        stacked: true
      }
    },
    plugins: {
      datalabels: {
        display: false
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructeurs ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.labels = [""];
    this.repartitionAppel = [[0, 0, 0]];

    this.utiliserPourcentages = false;
    this.unite = 'secondes';

    this.valeurObservable = this.value.current.subscribe(_ => this.getData());
    this.dataObservable = this.data.current.subscribe(_ => this.getData());
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    const valeurs = this.getValeursTraitees();

    this.stackedBarChartData = {
      labels: this.labels,
      datasets: [{
        label: "Temps d'attente",
        data: valeurs.map(appel => appel[0]),
        backgroundColor: Rouge,
      }, {
        label: "Temps de mise en garde",
        data: valeurs.map(appel => appel[1]),
        backgroundColor: Turquoise,
      }, {
        label: "Temps de communication",
        data: valeurs.map(appel => appel[2]),
        backgroundColor: Vert,
      }]
    };

    this.stackedBarChartOptions = this.utiliserPourcentages ? {
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
          display: false
        }
      }
    } : {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        x: {
          stacked: true
        },
        y: {
          min: 0,
          stacked: true
        }
      },
      plugins: {
        datalabels: {
          display: false
        }
      }
    }
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
      if (!(data)) return;
      this.labels = data.labels;
      this.repartitionAppel = data.values;
      this.ngOnChanges();
    });
  }
  private getValeursTraitees(): number[][] {
    this.utiliserPourcentages = false;

    switch (this.unite) {
      case "pourcentages":
        break;
      case "secondes":
        return this.repartitionAppel;
      case "minutes":
        return this.repartitionAppel.map(valeurs => valeurs.map(valeur => Math.round(valeur / 60)));
    }

    this.utiliserPourcentages = true;

    const moyenneTotaux: number[] = this.repartitionAppel.map(valeur => valeur.reduce((a, b) => a + b, 0));
    let pourcents: number[][] = [];

    for (let i = 0; i < this.repartitionAppel.length; ++i) {
      const moyenneAttente: number = this.repartitionAppel[i][0] / moyenneTotaux[i] * 100;
      const moyenneMiseEnGarde: number = this.repartitionAppel[i][1] / moyenneTotaux[i] * 100;
      const moyenneCommunication: number = this.repartitionAppel[i][2] / moyenneTotaux[i] * 100;

      pourcents.push([moyenneAttente, moyenneMiseEnGarde, moyenneCommunication]);
    }

    return pourcents;
  }

  public setUnite($event: MatSelectChange) {
    this.unite = $event.value;
    this.ngOnChanges();
  }
}
