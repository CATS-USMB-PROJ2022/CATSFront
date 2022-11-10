import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {ChartData, ChartType} from "chart.js";
import { StatusCallService } from 'src/app/service/status_call.service';

@Component({
  selector: 'app-end-call-diagram',
  templateUrl: './status-call-diagram.component.html',
  styleUrls: ['./status-call-diagram.component.css']
})
export class StatusCallDiagramComponent implements OnInit, OnChanges {
  
  public label:string[];
  public statusCall:number[];

  constructor(private StatusCallService: StatusCallService) {
    this.label = [""];
    this.statusCall = [0];
  }

  ngOnInit(): void {
    this.getData()
  }
 
  
  ngOnChanges(): void {
      this.pieChartData = {
        labels: this.label,
        datasets: [{
          data: this.statusCall
        }]
      }

  }

  private getData(){
    this.StatusCallService.getStatusCall().subscribe(data => {
      this.label=data.label
      this.statusCall=data.nbr
      this.ngOnChanges()
    })
    
  }

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ["label"],
    datasets: [ {
      data: [0]
    } ]
  };

  public pieChartType: ChartType = 'pie';
}
