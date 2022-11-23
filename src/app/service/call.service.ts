import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Call } from '../model/calls';
import { Post } from '../model/post';

const globalUrl="http://localhost:8080/";


@Injectable({
  providedIn: 'root'
})
export class CallService {


  constructor(private http: HttpClient) { }

  public getNumberCallWithCaisse(caisse:number, start:Date, end:Date): Observable<Call>{

    return this.http.get<Call>(globalUrl+'Home?RUB_ID_CAISSE='+caisse+'&START='+start.toISOString()+'&END='+end.toISOString());
  }

  public postNumberCall(caisse:number, start:Date, end:Date, gtapp:String[]): Observable<Call>{

    let str:string="";
    for (let index=0; index<gtapp.length;index++){
      if(index==1){
        str+=" "+gtapp[index]+ " ";
      }
      else{str+="| "+gtapp[index]+ " ";}
    }

    let post:Post=new Post(caisse, start.toISOString(), end.toISOString(), "", str);
    return this.http.post<any>(globalUrl+'Home', post);
  }
}
