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

  public postNumberCall(caisse: number = this.getCookieCaisse()): Observable<Call> {
    let post: Post;

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
    let hno = Number(this.cookie.get("hno"));

    post = new Post(caisse, start_date.toLocaleDateString(), end_date.toLocaleDateString(), start_time, end_time, agences, gt, threshold, hno);
    console.log(post);
    return this.http.post<Call>(`${globalUrl}Home`, post);
  }

  public getNumberCallWithCaisse(caisse: number, start: Date, end: Date): Observable<Call> {
    return this.http.get<Call>(globalUrl + 'Home?RUB_ID_CAISSE=' + caisse + '&START=' + start.toISOString() + '&END=' + end.toISOString());
  }

  public getCookieCaisse() {
    return Number(this.cookie.get("caisse"));
  }
}
