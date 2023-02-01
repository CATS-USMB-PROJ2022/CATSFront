import {Component, OnInit} from '@angular/core';
import {CallService} from "../../service/call.service";
import {CookieService} from "ngx-cookie-service";
import {ValueService} from "../../service/value.service";
import {DataService} from "../../service/data.service";

export interface Filtre {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'multi-select-filter',
  templateUrl: './multi-select-filter.component.html',
  styleUrls: ['./multi-select-filter.component.css']
})
export class MultiSelectFilterComponent implements OnInit {
  public filtreGt: Filtre[];
  public filteredGt: Filtre[];
  searchGt: string;

  public filtreAgence: Filtre[];
  public filteredAgence: Filtre[];
  searchAgence: string;

  public gtAppele: string[];
  public gtAppeleId: string[];
  public rubTypeNum: string[];

  constructor(private callService: CallService, private cookieService: CookieService, private data: DataService, private valueService: ValueService) {
    this.gtAppele = [""];
    this.gtAppeleId = [""];
    this.rubTypeNum = [""];

    this.filtreGt = this.getGtAppele();
    this.filtreAgence = this.getAgences();

    this.filteredGt = this.filtreGt;
    this.filteredAgence = this.filtreAgence;

    this.searchGt = '';
    this.searchAgence = '';

    this.data.current.subscribe(_ => this.initDataCalls());
  }

  ngOnInit(): void {
    this.initDataCalls();
  }

  onSearchGt(search: string) {
    if (search) this.searchGt = search.toLowerCase();
    else this.searchGt = '';
  }

  onSearchAgence(search: string) {
    if (search) this.searchAgence = search.toLowerCase();
    else this.searchAgence = '';
  }

  getFilteredGt() {
    return this.filtreGt.filter(gt => gt.name.toLowerCase().includes(this.searchGt));
  }

  getFilteredAgence() {
    return this.filtreAgence.filter(agence => agence.name.toLowerCase().includes(this.searchAgence));
  }

  getCurrentCaisse(): number {
    return Number(this.cookieService.get("caisse"));
  }

  private initDataCalls() {
    this.callService.postNumberCall().subscribe(data => {
      this.gtAppeleId = data.gtAppeleId;
      this.gtAppele = data.gtAppele;
      this.rubTypeNum = data.rubTypenum;

      this.miseJourGtAppel();
      this.miseJourAgences();
    });
  }

  public getGtAppele(): Filtre[] {
    if (this.cookieService.get("gt") == "") this.cookieService.set("gt", "[]");
    let selectedGt = JSON.parse(this.cookieService.get("gt"));

    let filtres: Filtre[] = [];
    console.log(this.gtAppele)

    for (let index = 0; index < this.gtAppele.length; index++) {
      filtres[index] = {name: this.gtAppele[index], completed: selectedGt.includes(this.gtAppeleId[index])};
    }
    return filtres;
  }

  public getAgences(): Filtre[] {
    if (this.cookieService.get("agences") == "") {
      this.cookieService.set("agences", "[]");
    }
    let selectedAgences = JSON.parse(this.cookieService.get("agences"));

    let filtres: Filtre[] = [];
    console.log(this.rubTypeNum);

    for (let index = 0; index < this.rubTypeNum.length; index++) {
      filtres[index] = {name: this.rubTypeNum[index], completed: selectedAgences.includes(this.rubTypeNum[index])};
    }

    return filtres;
  }

  setAllGt(completed: boolean) {
    if (this.filtreGt == null) return;
    if (completed) this.setAllAgences(false);
    this.filtreGt.forEach(t => (t.completed = completed));
  }

  setAllAgences(completed: boolean) {
    if (this.filtreAgence == null) return;
    if (completed) this.setAllGt(false);
    this.filtreAgence.forEach(t => (t.completed = completed));
  }

  setGtSelected() {
    this.setAllAgences(false);
  }

  setAgenceSelected() {
    this.setAllGt(false);
  }

  miseJourGtAppel() {
    this.filtreGt = this.getGtAppele();
  }

  miseJourAgences() {
    this.filtreAgence = this.getAgences();
  }

  public updateFiltres() {
    let filtresGt = this.filtreGt ? this.filtreGt : [];
    let gt: string[];
    gt = [];

    let filtresAgence = this.filtreAgence ? this.filtreAgence : [];
    let agences: string[];
    agences = [];

    for (let i = 0; i < filtresGt.length; i++) {
      let id = this.gtAppeleId[i];
      let {completed} = filtresGt[i];
      if (completed) {
        gt.push(id);
      }
    }

    for (let {name, completed} of filtresAgence) {
      if (completed) {
        agences.push(name);
      }
    }

    this.cookieService.set("gt", JSON.stringify(gt));
    this.cookieService.set("agences", JSON.stringify(agences));

    this.getDataCalls();
  }

  private getDataCalls() {
    this.callService.postNumberCall().subscribe(data => {
      this.valueService.setValues(data);
      this.gtAppeleId = data.gtAppeleId;
      this.gtAppele = data.gtAppele;
      this.rubTypeNum = data.rubTypenum;
    })
  }
}
