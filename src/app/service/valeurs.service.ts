import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Appel} from "../model/appel";

@Injectable({
  providedIn: 'root'
})
export class ValeursService {
  private source = new BehaviorSubject({
    nombreAppels: 0,
    tempsAttenteMoyen: 0,
    tempsCommunicationMoyen: 0,
    gtAppeleId: [""],
    gtAppele: [""],
    labelsStatut: [""],
    valuesStatut: [0],
    nbTransfert: 0,
    nbTransfertOk: 0,
    moyenneTransfertTentatives: 0,
    labelsCauseFin: [""],
    valuesCauseFin: [0],
    nbDebordement: 0,
    nbAppelsDebordesAbandonnes: 0
  });

  current = this.source.asObservable();

  setValues(data: Appel) {
    this.source.next({
      nombreAppels: data.nbrAppel,
      tempsAttenteMoyen: data.moyenneTempsAttente,
      tempsCommunicationMoyen: data.moyenneTempsTravail,
      gtAppeleId: data.gtAppeleId,
      gtAppele: data.gtAppele,
      labelsStatut: data.labelsStatut,
      valuesStatut: data.valuesStatut,
      nbTransfert: data.nbTransfert,
      nbTransfertOk: data.nbTransfertOk,
      moyenneTransfertTentatives: data.moyenneTransfertTentatives,
      labelsCauseFin: data.labelsCauseFin,
      valuesCauseFin: data.valuesCauseFin,
      nbDebordement: data.nbDebordement,
      nbAppelsDebordesAbandonnes: data.nbAppelsDebordesAbandonnes
    });
  }
}
