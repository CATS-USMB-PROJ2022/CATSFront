import { Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {ChartData} from "chart.js";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {PostService} from "../../service/post.service";
import {getCouleurs} from "../../../utils";
import { ValeursService } from '../../service/valeurs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'diagramme-motif-fin-appel',
  templateUrl: './diagramme-motif-fin-appel.component.html',
  styleUrls: ['./diagramme-motif-fin-appel.component.css']
})
export class DiagrammeMotifFinAppelComponent implements OnInit, OnChanges, OnDestroy {
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Attributs ////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  public label: string[];
  public motifsFinAppel: number[];

  public dataObservable: Subscription;
  public valeurObservable: Subscription;

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ["label"],
    datasets: [ {
      data: [0]
    } ]
  };

  public pieChartOptions: any = {
    plugins: {
      datalabels: {
        display: false
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructeurs ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private CaisseRegionale: CaisseRegionaleService, private Post: PostService, private valeur: ValeursService) {
    this.label = [""];
    this.motifsFinAppel = [0];
    this.dataObservable=this.CaisseRegionale.current.subscribe(_ => this.getDataStatus());
    this.valeurObservable=this.valeur.current.subscribe(_=> this.getDataStatus());
  }

  ngOnInit(): void { this.getDataStatus(); }

  ngOnChanges(): void {
    this.pieChartData = {
      labels: this.label,
      datasets: [{
        data: this.motifsFinAppel,
        backgroundColor: getCouleurs(this.motifsFinAppel.length),
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
  private getDataStatus() {
    this.Post.postMotifsFinAppel().subscribe(data => {
      if(!(data))return ;
      this.label = data.label;
      this.motifsFinAppel = data.nbr;
      this.ngOnChanges();
    });
  }
}
