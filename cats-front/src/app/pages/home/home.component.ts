import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

import data from '../../../assets/json/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  constructor() { }

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    datasets: data.Status_call_data.nb
  };

  public pieChartType: ChartType = 'pie';
  ngOnInit(): void {
  }

}
