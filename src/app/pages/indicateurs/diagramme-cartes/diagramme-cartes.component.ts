import {Component, Input, OnChanges, OnInit, OnDestroy} from "@angular/core";
import {ChartData} from "chart.js";
import {CaisseRegionaleService} from "../../../service/caisse-regionale.service";
import {getCouleurs} from "../../../../utils";
import {Observable, Subscription} from "rxjs";
import { ValeursService } from "src/app/service/valeurs.service";

@Component({
  selector: 'diagramme-cartes[titre][lienParent][racine][getDonnees]',
  templateUrl: './diagramme-cartes.component.html',
  styleUrls: ['./diagramme-cartes.component.css']
})
export class DiagrammeCartesComponent implements OnInit, OnChanges, OnDestroy {
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Attributs ////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  @Input() titre: string = 'Graphe';
  @Input() lienParent: string = '/';
  @Input() racine: string = '/';
  @Input() liens: { label: string, lien: string }[] = [];
  @Input() getDonnees: () => Observable<any> = () => new Observable<any>();

  public label: string[];
  public valeurs: number[];
  public dataObservable: Subscription;
  public valeurObservable: Subscription;

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ["label"],
    datasets: [{
      data: [0]
    }]
  };

  public pieChartOptions = {
    plugins: {
      datalabels: {
        display: false,
      },
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructeurs ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private data: CaisseRegionaleService, private valeur: ValeursService) {
    this.label = [""];
    this.valeurs = [0];
    this.dataObservable=this.data.current.subscribe(_ => this.getDataStatus());
    this.valeurObservable=this.valeur.current.subscribe(_=> this.getDataStatus());
  }

  ngOnInit(): void { this.getDataStatus(); }

  ngOnChanges(): void {
    this.pieChartData = {
      labels: this.label,
      datasets: [{
        data: this.valeurs,
        backgroundColor: getCouleurs(this.valeurs.length, true),
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
    this.getDonnees().subscribe(data => {
      if(!(data))return ;
      this.label = data.label;
      this.valeurs = data.nbr;
      this.ngOnChanges();
    });
  }

  getTotalAppels() {
    let appels = 0;
    this.valeurs.forEach(appel => appels += appel);
    return appels;
  }

  getAppelPaires(): {label: string, valeur: number}[] {
    let appels = [];
    for (let i = 0; i < this.label.length; i++) appels.push({label: this.label[i], valeur: this.valeurs[i]});
    return appels;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Méthodes /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  getLienLabel(label: string): string {
    for (const l of this.liens) if (l.label === label) return l.lien;
    return this.racine;
  }
}
