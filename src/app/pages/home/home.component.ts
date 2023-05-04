import {Component, OnChanges, OnInit, OnDestroy} from '@angular/core';
import {ChartData} from "chart.js";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {StockageCookieService} from "../../service/stockage-cookie.service";
import {getCouleurs} from "../../../utils";
import {Subscription} from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
  public nombreAppels: number;
  public tempsAttenteMoyen: number;
  public tempsCommunicationMoyen: number;

  public labelsStatut: string[];
  public valuesStatut: number[];

  public nbTransfert: number;
  public nbTransfertOk: number;
  public moyenneTransfertTentatives: number;

  public labelsCauseFin: string[];
  public valuesCauseFin: number[];

  public nbDebordement: number;
  public nbSupSeuil: number;

  public pourcentage_en_communication: number;
  public pourcentage_autres: number;

  public seuil: number;

  public dataObservable: Subscription;
  public valeurObservable: Subscription;

  public donneesDiagrammeStatut: ChartData<'pie', number[], string | string[]> = {
    labels: ["label"],
    datasets: [{
      data: [0]
    }]
  };

  public donneesDiagrammeMotifFinAppel: ChartData<'pie', number[], string | string[]> = {
    labels: ["label"],
    datasets: [{
      data: [0]
    }]
  };

  constructor(private StockageCookie: StockageCookieService, private CaisseRegionale: CaisseRegionaleService, private Valeurs: ValeursService, private Post: PostService) {
    this.nombreAppels = 0;
    this.tempsCommunicationMoyen = 0;
    this.tempsAttenteMoyen = 0;
    this.nbDebordement = 0;
    this.pourcentage_en_communication = 0;
    this.pourcentage_autres = 0;
    this.seuil = 0.0;
    this.nbSupSeuil = 0;

    this.nbTransfert = 0;
    this.nbTransfertOk = 0;
    this.moyenneTransfertTentatives = 0.0;

    this.labelsStatut = [""];
    this.valuesStatut = [0];
    this.labelsCauseFin = [""];
    this.valuesCauseFin = [0];

    this.dataObservable = this.CaisseRegionale.current.subscribe(_ => this.initialiserDonneesAppels());
    this.valeurObservable = this.Valeurs.current.subscribe(value => this.updateDonneesAppels(value));
  }

  ngOnInit(): void {
    this.initialiserDonneesAppels();
  }

  ngOnChanges(): void {
    this.donneesDiagrammeStatut = {
      labels: this.labelsStatut,
      datasets: [{
        data: this.valuesStatut,
        backgroundColor: getCouleurs(this.valuesStatut.length),
      }]
    };

    this.donneesDiagrammeMotifFinAppel = {
      labels: this.labelsCauseFin,
      datasets: [{
        data: this.valuesCauseFin,
        backgroundColor: getCouleurs(this.valuesCauseFin.length),
      }]
    };
  }

  ngOnDestroy(): void {
    this.dataObservable.unsubscribe();
    this.valeurObservable.unsubscribe();
  }

  private getSeuilCalls() {
    this.Post.postSeuil().subscribe(data => this.nbSupSeuil = data.nbSupSeuil);
  }

  initialiserDonneesAppels() {
    this.Post.postNombreAppels().subscribe(data => {
      this.nombreAppels = data.nbrAppel;
      this.tempsCommunicationMoyen = Math.round(data.moyenneTempsTravail);
      this.tempsAttenteMoyen = Math.round(data.moyenneTempsAttente);
      this.labelsStatut = data.labelsStatut;
      this.valuesStatut = data.valuesStatut;
      this.labelsCauseFin = data.labelsCauseFin;
      this.valuesCauseFin = data.valuesCauseFin;
      this.nbDebordement = data.nbDebordement;

      this.nbTransfert = data.nbTransfert;
      this.nbTransfertOk = data.nbTransfertOk;
      this.moyenneTransfertTentatives = Number(data.moyenneTransfertTentatives.toFixed(2));

      this.reinitialiserSeuil();

      this.calculatePercentages();

      this.ngOnChanges();
    });
  }

  updateDonneesAppels(value: {
    nombreAppels: number,
    tempsAttenteMoyen: number,
    tempsCommunicationMoyen: number,
    gtAppeleId: string[],
    gtAppele: string[],
    labelsStatut: string[],
    valuesStatut: number[],
    labelsCauseFin: string[],
    valuesCauseFin: number[],
    nbDebordement: number,
    nbTransfert: number,
    nbTransfertOk: number,
    moyenneTransfertTentatives: number
  }) {
    if (!(value)) return;
    this.nombreAppels = value.nombreAppels;
    this.tempsAttenteMoyen = Math.round(value.tempsAttenteMoyen);
    this.tempsCommunicationMoyen = Math.round(value.tempsCommunicationMoyen);
    this.labelsStatut = value.labelsStatut;
    this.valuesStatut = value.valuesStatut;
    this.labelsCauseFin = value.labelsCauseFin;
    this.valuesCauseFin = value.valuesCauseFin;
    this.nbDebordement = value.nbDebordement;
    this.nbTransfert = value.nbTransfert;
    this.nbTransfertOk = value.nbTransfertOk;
    this.moyenneTransfertTentatives = Number(value.moyenneTransfertTentatives.toFixed(2));

    this.reinitialiserSeuil();

    this.calculatePercentages();

    this.ngOnChanges();
  }

  private calculatePercentages() {
    const en_communication = this.valuesStatut[0];
    const autres = this.valuesStatut[1];
    const total = en_communication + autres;

    this.pourcentage_en_communication = Math.round((en_communication / total) * 100);
    this.pourcentage_autres = Math.round((autres / total) * 100);
  }

  appliquerSeuil(value: number) {
    this.seuil = value;
    this.StockageCookie.reinitialiserSeuil(value);
    this.getSeuilCalls();
  }

  reinitialiserSeuil() {
    this.appliquerSeuil(this.tempsAttenteMoyen);
  }
}
