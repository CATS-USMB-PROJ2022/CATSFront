import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Call} from '../model/calls';
import {Post} from "../model/post";
import {Time} from "@angular/common";

const globalUrl = "http://localhost:8080/";


@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private http: HttpClient) {
  }

  public postNumberCall(caisse: number, date_start: Date, date_end: Date, time_start: Time, time_end: Time, gt: string[], agences: string[]): Observable<Call> {
    let post: Post;

    if(time_end.minutes==0 && time_end.hours==0)
      var env_time_end="00:00:00";
    else{
      var env_time_end=`${time_end.hours}:${time_end.minutes}:00`
    }

    if(time_start.minutes==0 && time_start.hours==0)
      var env_time_start="00:00:00";
    else{
      var env_time_start=`${time_start}:00`
    }
    console.log("start : "+env_time_start);
    console.log("end : "+env_time_end);
    post = new Post(caisse, date_start.toLocaleDateString(), date_end.toLocaleDateString(), env_time_start, env_time_end, [], gt);
    console.log(post);
    return this.http.post<Call>(`${globalUrl}Home`, post);
  }

  public getNumberCallWithCaisse(caisse: number, start: Date, end: Date): Observable<Call> {
    return this.http.get<Call>(globalUrl + 'Home?RUB_ID_CAISSE=' + caisse + '&START=' + start.toISOString() + '&END=' + end.toISOString());
  }
}
