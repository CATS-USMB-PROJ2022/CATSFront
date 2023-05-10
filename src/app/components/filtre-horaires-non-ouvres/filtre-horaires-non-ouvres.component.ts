import {Component} from '@angular/core';
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {StockageCookieService} from "../../service/stockage-cookie.service";

@Component({
  selector: 'filtre-horaires-non-ouvres',
  templateUrl: './filtre-horaires-non-ouvres.component.html',
  styleUrls: ['./filtre-horaires-non-ouvres.component.css']
})
export class FiltreHorairesNonOuvresComponent {
  public horaires_ouvres: boolean;
  public horaires_non_ouvres: boolean;

  constructor(private StocakgeCookie: StockageCookieService, private Value: ValeursService, private Post: PostService) {
    this.horaires_ouvres = true;
    this.horaires_non_ouvres = false;
    this.setValeur(this.StocakgeCookie.initialiserHorairesNonOuvres());
  }

  public setHorairesOuvres() {
    if (!this.horaires_ouvres) this.horaires_non_ouvres = true;
  }

  public setHorairesNonOuvres() {
    if (!this.horaires_non_ouvres) this.horaires_ouvres = true;
  }

  setValeur(v: number) {
    this.horaires_ouvres = v == 1;
    this.horaires_non_ouvres = v < 1;
  }

  getValeurCoches(): number {
    if (this.horaires_ouvres && !this.horaires_non_ouvres) return 1;
    else if (!this.horaires_ouvres && this.horaires_non_ouvres) return 0;
    else return -1;
  }

  appliquerHoraires() {
    this.StocakgeCookie.setHorairesNonOuvres(this.getValeurCoches());
    this.Post.postNombreAppels().subscribe(data => this.Value.setValues(data));
  }

  reinitialiserHorairesNonOuvres() {
    this.StocakgeCookie.reinitialiserHorairesNonOuvres();
    this.setValeur(this.StocakgeCookie.getHorairesNonOuvres());
    this.appliquerHoraires();
  }

  reinitialiser = () => this.reinitialiserHorairesNonOuvres();
  appliquer = () => this.appliquerHoraires();
}
