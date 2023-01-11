import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MotiveEndCall } from '../model/motive-end_call';
import {Time} from "@angular/common";
import {Call} from "../model/calls";
import {Post} from "../model/post";
import {CallService} from "./call.service";

const globalUrl="http://localhost:8080/";


@Injectable({
  providedIn: 'root'
})
export class MotiveEndCallService {



  constructor(private http: HttpClient) { }

  public postMotiveEndCall(caisse: number, date_start: Date, date_end: Date, time_start: Time, time_end: Time, gt: string[], agences: string[], threshold: number): Observable<MotiveEndCall> {
    let post: Post;

    if(time_end.minutes==0 && time_end.hours==0)
      var env_time_end="00:00:00";
    else if(time_end.minutes==59 && time_end.hours==23){
      var env_time_end=`${time_end.hours}:${time_end.minutes}:00`
    }else{
      var env_time_end=`${time_end}:00`
    }

    if(time_start.minutes==0 && time_start.hours==0)
      var env_time_start="00:00:00";
    else{
      var env_time_start=`${time_start}:00`
    }
    console.log("start : "+env_time_start);
    console.log("end : "+env_time_end);
    post = new Post(caisse, date_start.toLocaleDateString(), date_end.toLocaleDateString(), env_time_start, env_time_end, agences, gt, threshold);
    console.log(post);
    return this.http.post<MotiveEndCall>(`${globalUrl}AppelCauseFin`, post);
  }

}