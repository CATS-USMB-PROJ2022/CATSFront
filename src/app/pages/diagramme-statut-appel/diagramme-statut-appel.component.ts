import {Component, OnInit, OnChanges} from '@angular/core';
import {ChartData, ChartType} from "chart.js";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {PostService} from "../../service/post.service";
import {ValeursService} from "../../service/valeurs.service";
import {getCouleurs} from "../../../utils";

@Component({
  selector: 'diagramme-statut-appel',
  templateUrl: './diagramme-statut-appel.component.html',
  styleUrls: ['./diagramme-statut-appel.component.css']
})
export class DiagrammeStatutAppelComponent implements OnInit, OnChanges {
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Attributs ////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  public label: string[];
  public statusCall: number[];

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ["label"],
    datasets: [{
      data: [0]
    }]
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructeurs ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.label = [""];
    this.statusCall = [0];

    this.data.current.subscribe(_ => this.getDataStatus());
    this.value.current.subscribe(_ => this.getDataStatus());
  }

  ngOnInit(): void {
    this.data.current.subscribe(_ => this.getDataStatus());
    this.getDataStatus();
  }

  ngOnChanges(): void {
    this.pieChartData = {
      labels: this.label,
      datasets: [{
        data: this.statusCall,
        backgroundColor: getCouleurs(this.statusCall.length, true),
      }]
    };
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Getters //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  private getDataStatus() {
    this.PostService.postStatutsAppel().subscribe(data => {
      this.label = data.label;
      this.statusCall = data.nbr;
      this.ngOnChanges();
    });
  }
}
