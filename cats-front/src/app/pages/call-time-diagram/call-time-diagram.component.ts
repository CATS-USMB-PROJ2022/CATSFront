import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import data from './../../../assets/json/data.json';

@Component({
  selector: 'app-call-time-diagram',
  templateUrl: './call-time-diagram.component.html',
  styleUrls: ['./call-time-diagram.component.css']
})
export class CallTimeDiagramComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: data.Time_data.label,
    datasets: data.Time_data.nb
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
