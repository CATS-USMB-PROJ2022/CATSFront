export interface Appel {
  nbrAppel: number;
  moyenneTempsAttente: number;
  moyenneTempsTravail: number;
  rubIdCaisse: number[];
  caisse: string[];
  gtAppeleId: string[];
  gtAppele: string[];
  rubTypenum: string[];
  labelsStatut: string[];
  valuesStatut: number[];
  nbTransfert: number;
  nbTransfertOk: number;
  moyenneTransfertTentatives: number;
  labelsCauseFin: string[];
  valuesCauseFin: number[];
  nbDebordement: number;
  nbAppelsDebordesAbandonnes: number;
}
