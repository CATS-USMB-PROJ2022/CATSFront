import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private source = new BehaviorSubject('-1');
  current = this.source.asObservable();

  constructor() { }

  setCaisse(selected: number) {
    this.source.next(selected.toString());
  }

}
