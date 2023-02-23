import {Component, OnInit} from '@angular/core';
import {ValeursService} from "../../service/valeurs.service";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {PostService} from "../../service/post.service";
import {StockageCookieService} from "../../service/stockage-cookie.service";

export interface Filtre {
  nom: string;
  coche: boolean;
}

@Component({
  selector: 'filtre-multi-selection',
  templateUrl: './filtre-multi-selection.component.html',
  styleUrls: ['./filtre-multi-selection.component.css']
})
export class FiltreMultiSelectionComponent implements OnInit {
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Attributs ////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  public groupes_trafic: Filtre[];
  public groupes_trafic_filtres: Filtre[];
  recherche_groupe_traffic: string;

  public agences: Filtre[];
  public agences_filtrees: Filtre[];
  recherche_agence: string;

  public gtAppele: string[];
  public gtAppeleId: string[];
  public rubTypeNum: string[];

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructeurs ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private StockageCookie: StockageCookieService, private CaisseRegionale: CaisseRegionaleService, private Value: ValeursService, private Post: PostService) {
    this.gtAppele = [""];
    this.gtAppeleId = [""];
    this.rubTypeNum = [""];

    this.groupes_trafic = this.getGtAppele();
    this.agences = this.getAgences();

    this.groupes_trafic_filtres = this.groupes_trafic;
    this.agences_filtrees = this.agences;

    this.recherche_groupe_traffic = '';
    this.recherche_agence = '';

    this.CaisseRegionale.current.subscribe(_ => this.initialiserDonneesAppels());
  }

  ngOnInit(): void { this.initialiserDonneesAppels(); }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Setters //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  setGroupeTraficSelectionne() { this.setToutesAgences(false); }
  setAgenceSelectionnee() { this.setTousGroupesTrafic(false); }

  setTousGroupesTrafic(cocher_tout: boolean) {
    if (this.groupes_trafic == null) return;
    if (cocher_tout) this.setToutesAgences(false);
    this.groupes_trafic.forEach(t => (t.coche = cocher_tout));
  }

  setToutesAgences(cocher_tout: boolean) {
    if (this.agences == null) return;
    if (cocher_tout) this.setTousGroupesTrafic(false);
    this.agences.forEach(t => (t.coche = cocher_tout));
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Getters //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  getCaisseSelectionnee(): number { return this.StockageCookie.getCaisseRegionale(); }

  public getGtAppele(): Filtre[] {
    let gt_selectionnes = this.StockageCookie.initialiserGroupesTrafic();
    let filtres: Filtre[] = [];
    for (let i = 0; i < this.gtAppele.length; i++) filtres[i] = { nom: this.gtAppele[i], coche: gt_selectionnes.includes(this.gtAppeleId[i]) };
    return filtres;
  }

  public getAgences(): Filtre[] {
    let agences_selectionnees = this.StockageCookie.initialiserAgences();
    let filtres: Filtre[] = [];
    for (let i = 0; i < this.rubTypeNum.length; i++) filtres[i] = { nom: this.rubTypeNum[i], coche: agences_selectionnees.includes(this.rubTypeNum[i]) };
    return filtres;
  }

  getGroupesTraficFiltres() { return this.groupes_trafic.filter(groupe_trafic => groupe_trafic.nom.toLowerCase().includes(this.recherche_groupe_traffic)); }
  getAgencesFiltrees() { return this.agences.filter(agence => agence.nom.toLowerCase().includes(this.recherche_agence)); }

  private getDataCalls() {
    this.Post.postNombreAppels().subscribe(data => {
      this.Value.setValues(data);
      this.gtAppeleId = data.gtAppeleId;
      this.gtAppele = data.gtAppele;
      this.rubTypeNum = data.rubTypenum;
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Méthodes /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  private initialiserDonneesAppels() {
    this.Post.postNombreAppels().subscribe(data => {
      this.gtAppeleId = data.gtAppeleId;
      this.gtAppele = data.gtAppele;
      this.rubTypeNum = data.rubTypenum;

      this.updateGroupesTrafic();
      this.updateAgences();
    });
  }

  onRechercheGroupeTrafic(recherche: string) { this.recherche_groupe_traffic = recherche ? recherche.toLowerCase() : ''; }
  onRechercheAgence(recherche: string) { this.recherche_agence = recherche ? recherche.toLowerCase() : ''; }

  updateGroupesTrafic() { this.groupes_trafic = this.getGtAppele(); }

  updateAgences() { this.agences = this.getAgences(); }

  appliquerFiltres() {
    let groupes_trafic: Filtre[] = this.groupes_trafic ? this.groupes_trafic : [];
    let groupes_trafic_selectionnes: string[] = [];

    for (let i = 0; i < groupes_trafic.length; i++) if (groupes_trafic[i].coche) groupes_trafic_selectionnes.push(this.gtAppeleId[i]);

    let agences: Filtre[] = this.agences ? this.agences : [];
    let agences_selectionnees: string[] = [];

    for (let { nom, coche } of agences) if (coche) agences_selectionnees.push(nom);

    this.StockageCookie.setGroupesTrafic(groupes_trafic_selectionnes);
    this.StockageCookie.setAgences(agences_selectionnees);

    this.getDataCalls();
  }

  reinitialiserMultiSelection() {
    this.StockageCookie.reinitialiserMultiSelection();

    this.groupes_trafic = this.getGtAppele();
    this.agences = this.getAgences();

    this.groupes_trafic_filtres = this.groupes_trafic;
    this.agences_filtrees = this.agences;

    this.recherche_groupe_traffic = '';
    this.recherche_agence = '';

    this.getDataCalls();
  }
}
