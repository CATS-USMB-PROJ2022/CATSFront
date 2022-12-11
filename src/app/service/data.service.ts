import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

import {CaisseRegionale} from "../model/caisse";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public static defaultValue = new CaisseRegionale('All', -1, -1);
  private caisseSource = new BehaviorSubject(DataService.defaultValue);
  currentCaisse = this.caisseSource.asObservable();

  constructor() {
  }

  changeCaisse(caisse: CaisseRegionale) {
    this.caisseSource.next(caisse);
  }
}
