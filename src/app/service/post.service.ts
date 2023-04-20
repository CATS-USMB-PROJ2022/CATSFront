import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StatutAppel} from '../model/statut-appel';
import {Post} from "../model/post";
import {MotifFinAppel} from "../model/motif-fin-appel";
import {Appel} from "../model/appel";
import {StockageCookieService} from "./stockage-cookie.service";
import {RepartitionAppel} from "../model/repartition-appel";
import {DissuasionAppel} from "../model/dissuasion-appel";
import {AttenteRepartitionAppel} from "../model/AttenteRepartitionAppel";
import {DateRepartitionAppel} from "../model/date-repartition-appel";
import {ComAgent} from "../model/com-agent";
import {RepartitionAbandonAppel} from "../model/RepartitionAbandonAppel";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constants ////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  readonly localUrl = "http://localhost:8080";
  readonly onlineUrl = "http://141.95.151.1:8080";

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructors /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private Http: HttpClient, private StockageCookie: StockageCookieService) { }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Getters //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Construit un Post avec les attributs nécessaires
   * @param c Caisse régionale interrogée
   */
  private getPost(c: number = this.StockageCookie.getCaisseRegionale()): Post {
    let date_debut: string = this.StockageCookie.getDateDebut().toLocaleDateString();
    let date_fin: string = this.StockageCookie.getDateFin().toLocaleDateString();

    let heure_debut: string = `${this.StockageCookie.getHeureDebut()}:00`;
    let heure_fin: string = `${this.StockageCookie.getHeureFin()}:00`;

    let groupes_trafic: string[] = this.StockageCookie.getGroupesTrafic();
    let agences: string[] = this.StockageCookie.getAgences();

    let seuil: number = this.StockageCookie.getSeuil();
    let horaires_non_ouvres: number = this.StockageCookie.getHorairesNonOuvres();

    return new Post(c, date_debut, date_fin, heure_debut, heure_fin, agences, groupes_trafic, seuil, horaires_non_ouvres);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Methods //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  public postNombreAppels(c: number = this.StockageCookie.getCaisseRegionale()): Observable<Appel> { return this.Http.post<Appel>(`${this.localUrl}/Home`, this.getPost(c)); }

  public postMotifsFinAppel(): Observable<MotifFinAppel> { return this.Http.post<MotifFinAppel>(`${this.localUrl}/AppelCauseFin`, this.getPost()); }

  public postStatutsAppel(): Observable<StatutAppel> { return this.Http.post<StatutAppel>(`${this.localUrl}/AppelStatut`, this.getPost()); }

  public postRepartitionAppel(): Observable<RepartitionAppel> { return this.Http.post<RepartitionAppel>(`${this.localUrl}/AppelRepartition`, this.getPost()); }

  public postDissuasionAppel(): Observable<DissuasionAppel> { return this.Http.post<DissuasionAppel>(`${this.localUrl}/AppelCauseDissuasion`, this.getPost()); }

  public postAttenteRepartitionAppel(): Observable<AttenteRepartitionAppel> { return this.Http.post<AttenteRepartitionAppel>(`${this.localUrl}/AppelAttente`, this.getPost()); }

  public postDateRepartitionAppel(): Observable<DateRepartitionAppel> { return this.Http.post<DateRepartitionAppel>(`${this.localUrl}/AppelDateRepartition`, this.getPost()); }

  public postComAgent(): Observable<ComAgent>{ return this.Http.post<ComAgent>(`${this.localUrl}/ComAgent`, this.getPost()); }

  public postRepartitionAbandonAppel(): Observable<RepartitionAbandonAppel>{ return this.Http.post<RepartitionAbandonAppel>(`${this.localUrl}/AppelAbandonRepartition`, this.getPost()); }
  public postUploadFichiers(fichiers: File[]): Observable<any> {
    console.table(fichiers);

    const fd = new FormData();
    for (const fichier of fichiers) fd.append('file', fichier);
    return this.Http.post<any>(`${this.localUrl}/Upload`, fd);
  }
}
