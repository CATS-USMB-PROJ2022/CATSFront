import { Component, OnInit } from '@angular/core';
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {ValeursService} from "../../service/valeurs.service";
import {PostService} from "../../service/post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-graph-cheminement-appel',
  templateUrl: './graph-cheminement-appel.component.html',
  styleUrls: ['./graph-cheminement-appel.component.css']
})
export class GraphCheminementAppelComponent implements OnInit {

  arbre: string[][];

  public dataObservable: Subscription;
  public valeurObservable: Subscription;

  constructor(private data: CaisseRegionaleService, private value: ValeursService, private PostService: PostService) {
    this.arbre = [];

    this.valeurObservable=this.value.current.subscribe(_ => this.getData());
    this.dataObservable=this.data.current.subscribe(_ => this.getData());
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    // TODO : à implémenter
    console.log(this.arbre);
  }

  ngOnDestroy(): void {
    this.dataObservable.unsubscribe();
    this.valeurObservable.unsubscribe();
  }


  getData() {
    this.PostService.postCheminementAppel().subscribe(data => {
      this.arbre = data.arbre;
      this.ngOnChanges();
    });
  }

}
