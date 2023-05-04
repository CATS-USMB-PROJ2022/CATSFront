import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {ChartConfiguration, ChartType} from "chart.js";
import {getCouleurs} from "../../../utils";

interface Agent {
  agent: string;
  nbr: number;
  label: string;
}

@Component({
  selector: 'app-diagramme-com-agent',
  templateUrl: './diagramme-com-agent.component.html',
  styleUrls: ['./diagramme-com-agent.component.css']
})
export class DiagrammeComAgentComponent implements OnInit, OnChanges, OnDestroy {
  public labels: string[];
  public agents: string[];
  public dataAgent: Agent[];
  public dataObservable: Subscription;
  public valeurObservable: Subscription;

  public BubbleChartData: any = {
    labels: [""],
    datasets: [],
  };

  public BubbleChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: "Nombre d'appels"
        }
      }
    },
    elements: {
      point: {
        radius: 5
      }
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        display: false
      }
    },
  }
  bubbleChartType: ChartType = 'bubble';


  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.labels = [""];
    this.agents = [""];
    this.dataAgent = [];
    this.valeurObservable = this.value.current.subscribe(_ => this.getData());
    this.dataObservable = this.data.current.subscribe(_ => this.getData());
  }

  ngOnInit(): void {
    this.getData()
  }

  ngOnChanges(): void {
    //conversion des données pour le diagramme
    //TODO : optimiser
    let chartdata = [];

    for (const element of this.dataAgent) {
      let i = 0;
      let data = [];

      while (this.labels[i] != element.label && i < this.labels.length) {
        data.push(null);
        i++;
      }

      data.push(element.nbr);

      chartdata.push({
        data: data,
        label: element.agent
      });
    }

    this.BubbleChartData.datasets = chartdata;
    this.BubbleChartData.datasets.backgroundColor = getCouleurs(chartdata.length);

    this.BubbleChartOptions = {
      scales: {
        x: {
          type: 'category',
          labels: this.labels,
        },
      },
      plugins: {
        legend: {
          display: false
        },
        datalabels: {
          display: false
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.dataObservable.unsubscribe();
    this.valeurObservable.unsubscribe();
  }

  getData() {
    this.PostService.postComAgent().subscribe((data: any) => {
      if (data == null) return;

      this.agents = [""];
      this.labels = [""];
      this.dataAgent = [];

      for (const element of data) {
        const stat: Agent = {
          agent: element.agent,
          nbr: element.nbr,
          label: element.label
        };

        this.dataAgent.push(stat);

        if (!this.labels.includes(stat.label)) {
          this.labels.push(stat.label);
        }
      }

      this.ngOnChanges()
    });

  }

}
