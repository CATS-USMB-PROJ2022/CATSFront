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

  public postNumberCall(caisse: number, date_start: Date, date_end: Date, time_start: Time, time_end: Time, gt: string[]): Observable<Call> {
    let post: Post;
    const formatTime = (time: Time): string => `${time}:00`;
    post = new Post(caisse, date_start.toISOString(), date_end.toISOString(), formatTime(time_start), formatTime(time_end), [], gt);
    return this.http.post<Call>(`${globalUrl}Home`, post);
  }

  public getNumberCallWithCaisse(caisse: number, start: Date, end: Date): Observable<Call> {
    return this.http.get<Call>(globalUrl + 'Home?RUB_ID_CAISSE=' + caisse + '&START=' + start.toISOString() + '&END=' + end.toISOString());
  }
}
