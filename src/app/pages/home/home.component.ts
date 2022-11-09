import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Call } from 'src/app/model/calls';

import data from '../../../assets/json/data.json';
import {CallService} from './../../service/call.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nbCall:number;

  constructor(private CallService: CallService) {
    this.nbCall = 0;
  }

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    datasets: data.Status_call_data.nb
  };

  public pieChartType: ChartType = 'pie';

  ngOnInit(): void {
    this.getCallNumber()
    
  }

  private getCallNumber(){
    this.CallService.getNumberCall().subscribe(data => {
        this.nbCall=data.nbrAppel;
    })
  }



}
