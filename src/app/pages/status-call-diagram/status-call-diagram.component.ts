import { Component, OnInit } from '@angular/core';
import {ChartData, ChartType} from "chart.js";
import data from '../../../assets/json/data.json';

@Component({
  selector: 'app-end-call-diagram',
  templateUrl: './status-call-diagram.component.html',
  styleUrls: ['./status-call-diagram.component.css']
})
export class StatusCallDiagramComponent implements OnInit {
  constructor() {}
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: data.Status_call_data.label,
    datasets: data.Status_call_data.nb
  };

  public pieChartType: ChartType = 'pie';
  ngOnInit(): void {
  }

}
