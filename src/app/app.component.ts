import {Component, OnInit} from '@angular/core';
import {CaisseRegionaleService} from "./service/caisse-regionale.service";
import {ValeursService} from "./service/valeurs.service";
import {PostService} from "./service/post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "ReC'Appel";

  constructor(private CaisseRegionale: CaisseRegionaleService, private Valeurs: ValeursService, private Post: PostService) {
    this.CaisseRegionale.current.subscribe(_ => this.initDataCalls());
  }

  ngOnInit(): void {
    this.initDataCalls();
  }

  private initDataCalls() {
    this.Post.postNombreAppels().subscribe(data => this.Valeurs.setValues(data));
  }
}
