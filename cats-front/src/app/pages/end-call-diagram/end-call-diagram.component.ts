import { Component, OnInit } from '@angular/core';
import {ChartData, ChartType} from "chart.js";
import data from './../../../assets/json/data.json';

@Component({
  selector: 'app-end-call-diagram',
  templateUrl: './end-call-diagram.component.html',
  styleUrls: ['./end-call-diagram.component.css']
})
export class EndCallDiagramComponent implements OnInit {
  constructor() {}
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: data.Status_data.label,
    datasets: data.Status_data.nb
  };

  public pieChartType: ChartType = 'pie';
  ngOnInit(): void {
  }

}
