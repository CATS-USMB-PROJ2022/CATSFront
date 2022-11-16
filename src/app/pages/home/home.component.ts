import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { AppComponent } from 'src/app/app.component';
import { Call } from 'src/app/model/calls';
import data from '../../../assets/json/data.json';
import {CallService} from './../../service/call.service';
import {StatusCallService} from './../../service/status_call.service';
import { CookieService } from 'ngx-cookie-service';
import { ContentObserver } from '@angular/cdk/observers';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nbCall:number;
  public averageCall:number;
  private label:string[];
  private statusCall:number[];
  public percentageCom:number;
  public percentageOther:number;
  public caisses:number[];
  selected = 'All';
  nbrCaisse:number;


  constructor(private CallService: CallService, private StatusCallService: StatusCallService, public cookieService:CookieService) {
    this.nbCall = 0;
    this.averageCall=0;
    this.percentageCom=0;
    this.percentageOther=0;
    this.label=[""];
    this.statusCall=[0];
    this.caisses=[0];
    if(this.cookieService.get("caisse").length==0 )
      {
        this.cookieService.set("caisse", "-1");
      }
      this.nbrCaisse=Number(this.cookieService.get("caisse"));
    
  }

  ngOnInit(): void {
    if(this.cookieService.get("caisse")==null )
      {
        this.cookieService.set("caisse", "-1");
      }
    
    this.getDataCalls(this.nbrCaisse);
    this.getDataStatus(this.nbrCaisse);
  }

  private getDataCalls(caisse:number){
    this.CallService.getNumberCallWithCaisse(caisse).subscribe(data => {
        this.nbCall=data.nbrAppel;
        this.averageCall=Math.round(data.moyenneTempsAttente);
        this.caisses=data.caisses;
    })
  }

  getDataStatus(caisse:number){
    this.StatusCallService.getStatusCall(caisse).subscribe(data => {
      this.label=data.label
      this.statusCall=data.nbr
      this.extractStatusData()
    })
  }

  private extractStatusData(){
    var totalcall = 0;
    var numberCom = 0;
    var numberOther = 0;
    for (let index = 0; index < this.label.length; index++) {
      const labelElement = this.label[index];
      const statusCallElement = this.statusCall[index];
      if (labelElement == "com") {
        numberCom =statusCallElement;
      }
      else {
        numberOther += statusCallElement;
      }
      totalcall +=statusCallElement;
    }
    this.percentageCom = Math.round((numberCom/totalcall)*100);
    this.percentageOther = Math.round((numberOther/totalcall)*100);
  }

  public recupCaisse(){
    this.cookieService.set("caisse", this.selected);
    if(this.selected!="All"){
      this.getDataCalls(Number(this.selected));
    }
    else{
      this.getDataCalls(-1);
    }
  }
}
