import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class StockageCookieService {
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constantes ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  private readonly caisse_regionale_defaut: number = -1;
  private readonly caisse_regionale: string = "caisse_regionale";

  // 24h * 60min * 60s * 1000ms = 86 400 000ms entre hier et maintenant
  private readonly hier: Date = new Date(Date.now() - 86_400_000);
  private readonly date_debut: string = "date_debut";
  private readonly date_fin: string = "date_fin";

  private readonly heure_debut_defaut: string = "00:00";
  private readonly heure_fin_defaut: string = "23:59";
  private readonly heure_debut: string = "heure_debut";
  private readonly heure_fin: string = "heure_fin";

  private readonly groupes_trafic: string = "groupes_trafic";
  private readonly agences: string = "agences";

  private readonly seuil_defaut: number = 0;
  private readonly seuil: string = "seuil"

  private readonly horaires_non_ouvres_defaut: number = 0;
  private readonly horaires_non_ouvres: string = "horaires_non_ouvres";

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructeurs ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private CookieService: CookieService) { }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Setters //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  setCaisseRegionale(caisse_regionale: number) { this.setNumber(this.caisse_regionale, caisse_regionale); }

  setDateDebut(date: Date | null) { this.setDate(this.date_debut, date ?? this.hier); }
  setDateFin(date: Date | null) { this.setDate(this.date_fin, date ?? this.hier); }

  setHeureDebut(heure: string) { this.CookieService.set(this.heure_debut, heure); }
  setHeureFin(heure: string) { this.CookieService.set(this.heure_fin, heure); }

  setGroupesTrafic(groupes_trafic: string[]) { this.setArray(this.groupes_trafic, groupes_trafic); }
  setAgences(agences: string[]) { this.setArray(this.agences, agences); }

  setSeuil(seuil: number) { this.setNumber(this.seuil, seuil); }

  setHorairesNonOuvres(horairesNonOuvres: number) { this.setNumber(this.horaires_non_ouvres, horairesNonOuvres); }

  ////////////////////////////////////////////////////////////////////////
  //// Primitives ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  private setArray(label: string, array: string[]) { this.CookieService.set(label, JSON.stringify(array)); }
  private setDate(label: string, date: Date) { this.CookieService.set(label, date.toString()); }
  private setNumber(label: string, number: number) { this.CookieService.set(label, number.toString()); }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Getters //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  getCaisseRegionale(): number { return this.getNumber(this.caisse_regionale, this.caisse_regionale_defaut); }

  getDateDebut(): Date { return this.getDate(this.date_debut); }
  getDateFin(): Date { return this.getDate(this.date_fin); }

  getHeureDebut(): string { return this.CookieService.get(this.heure_debut) ? this.CookieService.get(this.heure_debut) : this.heure_debut_defaut; }
  getHeureFin(): string { return this.CookieService.get(this.heure_fin) ? this.CookieService.get(this.heure_fin) : this.heure_fin_defaut; }

  getGroupesTrafic(): string[] { return this.getArray(this.groupes_trafic); }
  getAgences(): string[] { return this.getArray(this.agences); }

  getSeuil(): number { return this.getNumber(this.seuil, this.seuil_defaut); }

  getHorairesNonOuvres(): number { return this.getNumber(this.horaires_non_ouvres, this.horaires_non_ouvres_defaut); }

  ////////////////////////////////////////////////////////////////////////
  //// Primitives ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  private getArray(label: string): string[] { return this.CookieService.get(label) ? JSON.parse(this.CookieService.get(label)) : []; }
  private getDate(label: string): Date { return this.CookieService.get(label) ? new Date(this.CookieService.get(label)) : this.hier; }
  private getNumber(label: string, fallback: number): number { return this.CookieService.get(label) ? Number(this.CookieService.get(label)) : fallback; }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Méthodes /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //// Initialisation valeurs ////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  initialiserCaisseRegionale(): number {
    if (this.CookieService.get(this.caisse_regionale) == "") this.reinitialiserCaisseRegionale();
    return this.getCaisseRegionale();
  }

  initialiserDateDebut(): Date {
    if (this.CookieService.get(this.date_debut) == "") this.reinitialiserDateDebut();
    return this.getDateDebut();
  }

  initialiserDateFin(): Date {
    if (this.CookieService.get(this.date_fin) == "") this.reinitialiserDateFin();
    return this.getDateFin();
  }

  initialiserHeureDebut(): string {
    if (this.CookieService.get(this.heure_debut) == "") this.reinitialiserHeureDebut();
    return this.getHeureDebut();
  }

  initialiserHeureFin(): string {
    if (this.CookieService.get(this.heure_fin) == "") this.reinitialiserHeureFin();
    return this.getHeureFin();
  }

  initialiserGroupesTrafic(): string[] {
    if (this.CookieService.get(this.groupes_trafic) == "") this.reinitialiserGroupesTrafic();
    return this.getGroupesTrafic();
  }

  initialiserAgences(): string[] {
    if (this.CookieService.get(this.agences) == "") this.reinitialiserAgences();
    return this.getAgences();
  }

  initialiserHorairesNonOuvres(): number {
    if (this.CookieService.get(this.horaires_non_ouvres) == "") this.reinitialiserHorairesNonOuvres();
    return this.getHorairesNonOuvres();
  }

  initialiserSeuil(valeur: number): number {
    if (this.CookieService.get(this.seuil) == "") this.reinitialiserSeuil(valeur);
    return this.getSeuil();
  }

  ////////////////////////////////////////////////////////////////////////
  //// Réinitialisation valeurs //////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  reinitialiserCaisseRegionale() { this.setCaisseRegionale(this.caisse_regionale_defaut); }

  reinitialiserDateHeure() {
    this.reinitialiserDateDebut();
    this.reinitialiserDateFin();

    this.reinitialiserHeureDebut();
    this.reinitialiserHeureFin();
  }

  reinitialiserDateDebut() { this.setDateDebut(this.hier); }
  reinitialiserDateFin() { this.setDateFin(this.hier); }

  reinitialiserHeureDebut() { this.setHeureDebut(this.heure_debut_defaut); }
  reinitialiserHeureFin() { this.setHeureFin(this.heure_fin_defaut); }

  reinitialiserMultiSelection() {
    this.reinitialiserGroupesTrafic();
    this.reinitialiserAgences();
  }

  reinitialiserGroupesTrafic() { this.setGroupesTrafic([]); }
  reinitialiserAgences() { this.setAgences([]); }

  reinitialiserSeuil(valeur: number) { this.setSeuil(valeur); }

  reinitialiserHorairesNonOuvres() { this.setHorairesNonOuvres(this.horaires_non_ouvres_defaut); }

  ////////////////////////////////////////////////////////////////////////
  //// Vérification valeur par défaut ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  isHeureDebutDefaut(heure: string): boolean { return heure == "" || heure == this.heure_debut_defaut; }
  isHeureFinDefaut(heure: string): boolean { return heure == "" || heure == this.heure_fin_defaut; }
}
