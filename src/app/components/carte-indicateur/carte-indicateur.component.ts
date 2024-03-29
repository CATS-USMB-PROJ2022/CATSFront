import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChartData} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'carte-indicateur[typeCarte][titre]',
  templateUrl: './carte-indicateur.component.html',
  styleUrls: ['./carte-indicateur.component.css']
})
export class CarteIndicateurComponent {
  @Input() typeCarte: 'valeur' | 'diagramme' = "valeur";
  @Input() titre: string = "INDICATEUR";
  @Input() routerLink: string = "/";

  @Input() seuil: boolean = false;
  @Input() labelSeuil: string = "";
  @Input() valeurSeuil: number = 0;

  @Input() data: ChartData<'pie', number[], string | string[]> = {datasets: []};
  @Input() labels: boolean = false;
  @Input() legende: { label: string, valeur: number }[] = [];

  @Output() onModificationSeuil = new EventEmitter<number>();
  @Output() onReinitialisationSeuil = new EventEmitter();

  ChartPlugins = [ChartDataLabels];

  options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    }
  }

  constructor() {
    if (this.seuil) this.onModificationSeuil.emit(this.valeurSeuil);
  }

  appliquerSeuil(seuil: string) {
    this.onModificationSeuil.emit(Number(seuil));
  }

  reinitialiserSeuil() {
    this.onReinitialisationSeuil.emit();
  }
}
