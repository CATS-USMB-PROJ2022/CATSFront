import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Call} from "../model/calls";

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private source = new BehaviorSubject({
    nbrAppel: 0,
    moyenneTempsAttente: 0,
    moyenneTempsTravail: 0,
    gtAppeleId: [""],
    gtAppele: [""],
    labelsStatut: [""],
    valuesStatut: [0],
    labelsCauseFin: [""],
    valuesCauseFin: [0],
    nbDebordement: 0,
    nbSupSeuil: 0
  });

  current = this.source.asObservable();

  constructor() {
  }

  setValues(data: Call) {
    console.log(data);

    this.source.next({
      nbrAppel: data.nbrAppel,
      moyenneTempsAttente: data.moyenneTempsAttente,
      moyenneTempsTravail: data.moyenneTempsTravail,
      gtAppeleId: data.gtAppeleId,
      gtAppele: data.gtAppele,
      labelsStatut: data.labelsStatut,
      valuesStatut: data.valuesStatut,
      labelsCauseFin: data.labelsCauseFin,
      valuesCauseFin: data.valuesCauseFin,
      nbDebordement: data.nbDebordement,
      nbSupSeuil: data.nbSupSeuil
    });
  }
}
