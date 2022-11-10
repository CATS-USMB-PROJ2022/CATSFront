import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Call } from 'src/app/model/calls';
import data from '../../../assets/json/data.json';
import {CallService} from './../../service/call.service';
import {StatusCallService} from './../../service/status_call.service';

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

  constructor(private CallService: CallService, private StatusCallService: StatusCallService) {
    this.nbCall = 0;
    this.averageCall=0;
    this.percentageCom=0;
    this.percentageOther=0;
    this.label=[""];
    this.statusCall=[0];
  }

  ngOnInit(): void {
    this.getData()
  }

  private getData(){
    this.CallService.getNumberCall().subscribe(data => {
        this.nbCall=data.nbrAppel;
        this.averageCall=Math.round(data.moyenneTempsAttente);
    })

    this.StatusCallService.getStatusCall().subscribe(data => {
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
}
