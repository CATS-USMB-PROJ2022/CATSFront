import {Component, OnInit, OnChanges} from '@angular/core';
import {ChartData} from "chart.js";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {PostService} from "../../service/post.service";
import {getCouleurs} from "../../../utils";

@Component({
  selector: 'diagramme-dissuasion-appel',
  templateUrl: './diagramme-dissuasion-appel.component.html',
  styleUrls: ['./diagramme-dissuasion-appel.component.css', '../styles-indicateurs/diagramme-cartes.component.css']
})
export class DiagrammeDissuasionAppelComponent implements OnInit, OnChanges {
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
  constructor(private data: CaisseRegionaleService, private PostService: PostService) {
    this.label = [""];
    this.statusCall = [0];

    this.data.current.subscribe(_ => this.getDataStatus());
  }

  ngOnInit(): void { this.getDataStatus(); }

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
    this.PostService.postDissuasionAppel().subscribe(data => {
      this.label = data.label;
      this.statusCall = data.nbr;
      this.ngOnChanges();
    });
  }

  getTotalAppels() {
    let appels = 0;
    this.statusCall.forEach(appel => appels += appel);
    return appels;
  }

  getAppelPaires(): {label: string, valeur: number}[] {
    let appels = [];
    for (let i = 0; i < this.label.length; i++) appels.push({label: this.label[i], valeur: this.statusCall[i]});
    return appels;
  }
}
