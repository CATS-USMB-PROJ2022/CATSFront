import {Component, OnInit} from '@angular/core';
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {PostService} from "../../service/post.service";
import {StockageCookieService} from "../../service/stockage-cookie.service";

@Component({
  selector: 'menu-deroulant',
  templateUrl: './menu-deroulant.component.html',
  styleUrls: ['./menu-deroulant.component.css']
})
export class MenuDeroulantComponent implements OnInit {
  public rubIdCaisse: number[];
  public caisse: string[];
  public nbrCaisse: number;
  caisse_selectionnee: number = -1;

  isOuvert = false;

  constructor(private StockageCookie: StockageCookieService, private CaisseRegionale: CaisseRegionaleService, private Post: PostService) {
    this.rubIdCaisse = [0];
    this.caisse = [""];
    this.nbrCaisse = this.StockageCookie.initialiserCaisseRegionale();
  }

  ngOnInit(): void {
    this.initialiserDonneesAppels();
  }

  setCaisse(caisse_selectionnee: number) {
    this.caisse_selectionnee = caisse_selectionnee;
    this.StockageCookie.setCaisseRegionale(caisse_selectionnee);
    this.StockageCookie.reinitialiserMultiSelection();
    this.CaisseRegionale.setCaisse(caisse_selectionnee);
    this.isOuvert = false;
  }

  getLabelSelectionne() {
    return this.getCaisses().find(caisse => caisse.id == this.caisse_selectionnee)?.label;
  }

  getCaisses() {
    let caisses = [];
    for (let i = 0; i < this.rubIdCaisse.length; i++) caisses.push({id: this.rubIdCaisse[i], label: this.caisse[i]});
    return caisses;
  }

  private initialiserDonneesAppels() {
    this.Post.postNombreAppels(this.nbrCaisse).subscribe(data => {
      this.rubIdCaisse = data.rubIdCaisse;
      this.caisse = data.caisse;
      this.caisse_selectionnee = this.StockageCookie.getCaisseRegionale();
    });
  }

  bascule() {
    this.isOuvert = !this.isOuvert;
  }

  clicHorsMenu() {
    this.isOuvert = false;
  }

  isCaisseSelectionnee(caisse: number): boolean {
    return this.caisse_selectionnee === Number(caisse);
  }
}
