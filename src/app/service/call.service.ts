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

  public getNumberCall(): Observable<Call>{
    
    return this.http.get<Call>(globalUrl+'Home');
  }
}
