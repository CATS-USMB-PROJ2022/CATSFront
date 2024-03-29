import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaisseRegionaleService {
  private source: BehaviorSubject<number> = new BehaviorSubject(-1);
  current: Observable<number> = this.source.asObservable();

  setCaisse(selected: number) {
    this.source.next(selected);
  }
}
