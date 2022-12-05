import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Call } from '../model/calls';

const globalUrl="http://localhost:8080/";


@Injectable({
  providedIn: 'root'
})
export class CallService {


  constructor(private http: HttpClient) { }

  public getNumberCallWithCaisse(caisse:number, start:Date, end:Date): Observable<Call>{

    return this.http.get<Call>(globalUrl+'Home?RUB_ID_CAISSE='+caisse+'&START='+start.toISOString()+'&END='+end.toISOString());
  }
}
