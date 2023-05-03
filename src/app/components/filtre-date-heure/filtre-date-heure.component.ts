import {Component, Input} from '@angular/core';
import {ValeursService} from "../../service/valeurs.service";
import {DateRange} from "@angular/material/datepicker";
import {Time} from "@angular/common";
import {FormControl, FormGroup} from "@angular/forms";
import {PostService} from "../../service/post.service";
import {StockageCookieService} from "../../service/stockage-cookie.service";

@Component({
  selector: 'filtre-date-heure',
  templateUrl: './filtre-date-heure.component.html',
  styleUrls: ['./filtre-date-heure.component.css']
})
export class FiltreDateHeureComponent {
  @Input() dates: DateRange<Date> | undefined;

  placeholder_debut: string;
  placeholder_fin: string;

  horaires = new FormGroup({
    debut: new FormControl<Time | null>(null),
    fin: new FormControl<Time | null>(null),
  });

  private temp_date_debut: Date;
  private temp_date_fin: Date;

  private temp_heure_debut: string;
  private temp_heure_fin: string;

  constructor(private StockageCookie: StockageCookieService, private Value: ValeursService, private Post: PostService) {
    this.temp_date_debut = this.StockageCookie.initialiserDateDebut();
    this.temp_date_fin = this.StockageCookie.initialiserDateFin();

    this.dates = new DateRange<Date>(this.temp_date_debut, this.temp_date_fin);

    this.temp_heure_debut = this.StockageCookie.initialiserHeureDebut();
    this.temp_heure_fin = this.StockageCookie.initialiserHeureFin();

    this.placeholder_debut = this.getHeureDebut();
    this.placeholder_fin = this.getHeureFin();
  }

  getHeureDebut(): string {
    return this.StockageCookie.isHeureDebutDefaut(this.temp_heure_debut) ? "Début" : this.temp_heure_debut;
  }

  getHeureFin(): string {
    return this.StockageCookie.isHeureFinDefaut(this.temp_heure_fin) ? "Fin" : this.temp_heure_fin;
  }

  reinitialiserValeurs() {
    this.temp_date_debut = this.StockageCookie.getDateDebut();
    this.temp_date_fin = this.StockageCookie.getDateFin();

    this.dates = new DateRange<Date>(this.temp_date_debut, this.temp_date_fin);

    this.temp_heure_debut = this.StockageCookie.getHeureDebut();
    this.temp_heure_fin = this.StockageCookie.getHeureFin();

    this.horaires = new FormGroup({
      debut: new FormControl<Time | null>(null),
      fin: new FormControl<Time | null>(null)
    });

    this.placeholder_debut = this.getHeureDebut();
    this.placeholder_fin = this.getHeureFin();
  }

  reinitialiserDateHeure() {
    this.StockageCookie.reinitialiserDateHeure();
    this.reinitialiserValeurs();
    this.appliquerDateHeure();
  }

  changementDate(m: Date) {
    if (!this.dates?.start || this.dates?.end) this.dates = new DateRange<Date>(m, null);
    else {
      this.dates = m < this.dates.start ? new DateRange<Date>(m, this.dates.start) : new DateRange<Date>(this.dates.start, m);
      this.temp_date_debut = this.dates.start!;
      this.temp_date_fin = this.dates.end!;
    }
  }

  fermetureInputHeureDepart() {
    if (this.horaires.value.debut) this.temp_heure_debut = `${this.horaires.value.debut}`;
    else this.StockageCookie.reinitialiserHeureDebut();
  }

  fermetureInputHeureFin() {
    if (this.horaires.value.fin) this.temp_heure_fin = `${this.horaires.value.fin}`;
    else this.StockageCookie.reinitialiserHeureFin();
  }

  appliquerDateHeure() {
    this.StockageCookie.setDateDebut(this.temp_date_debut);
    this.StockageCookie.setDateFin(this.temp_date_fin);

    this.StockageCookie.setHeureDebut(this.temp_heure_debut);
    this.StockageCookie.setHeureFin(this.temp_heure_fin);

    this.Post.postNombreAppels().subscribe(data => this.Value.setValues(data));
  }

  reinitialiser = () => this.reinitialiserDateHeure();
  appliquer = () => this.appliquerDateHeure();
}
