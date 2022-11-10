import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StatusCall } from '../model/status_call';

const globalUrl="http://localhost:8080/";


@Injectable({
  providedIn: 'root'
})
export class StatusCallService {

  

  constructor(private http: HttpClient) { }

  public getStatusCall(): Observable<StatusCall>{
    
    return this.http.get<StatusCall>(globalUrl+'AppelStatut');
  }
}
