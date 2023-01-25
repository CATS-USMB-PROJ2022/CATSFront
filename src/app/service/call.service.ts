import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Call} from '../model/calls';
import {Post} from "../model/post";
import {CookieService} from "ngx-cookie-service";

const globalUrl = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CallService {
  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  public postNumberCall(caisse: number): Observable<Call> {
    // let env_time_start;
    // let env_time_end;
    let post: Post;

    // if (time_end.minutes == 0 && time_end.hours == 0)
    // {
    //   env_time_end = "00:00:00";
    // }
    // else if (time_end.minutes == 59 && time_end.hours == 23) {
    //   env_time_end = `${time_end.hours}:${time_end.minutes}:00`;
    // } else {
    //   env_time_end = `${time_end}:00`;
    // }
    //
    // if (time_start.minutes == 0 && time_start.hours == 0)
    // {
    //   env_time_start = "00:00:00";
    // }
    // else {
    //   env_time_start = `${time_start}:00`;
    // }
    //
    // console.log("start : "+env_time_start);
    // console.log("end : "+env_time_end);

    let start_date = new Date(this.cookie.get("start_date"));
    let end_date = new Date(this.cookie.get("end_date"));

    let start_time_hours = Number(this.cookie.get("start_time_hours"));
    let start_time_minutes = Number(this.cookie.get("start_time_minutes"));

    let end_time_hours = Number(this.cookie.get("end_time_hours"));
    let end_time_minutes = Number(this.cookie.get("end_time_minutes"));

    let start_time = `${start_time_hours < 10 ? '0' : ''}${start_time_hours}:${start_time_minutes < 10 ? '0' : ''}${start_time_minutes}:00`;
    let end_time = `${end_time_hours < 10 ? '0' : ''}${end_time_hours}:${end_time_minutes < 10 ? '0' : ''}${end_time_minutes}:00`;

    let gt = JSON.parse(this.cookie.get("gt"));
    let agences = JSON.parse(this.cookie.get("agences"));

    let threshold = Number(this.cookie.get("threshold"));

    post = new Post(caisse, start_date.toLocaleDateString(), end_date.toLocaleDateString(), start_time, end_time, agences, gt, threshold);
    console.log(post);
    return this.http.post<Call>(`${globalUrl}Home`, post);
  }

  public getNumberCallWithCaisse(caisse: number, start: Date, end: Date): Observable<Call> {
    return this.http.get<Call>(globalUrl + 'Home?RUB_ID_CAISSE=' + caisse + '&START=' + start.toISOString() + '&END=' + end.toISOString());
  }
}
