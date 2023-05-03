import {Component} from '@angular/core';
import {PostService} from "../../service/post.service";

@Component({
  selector: 'diagramme-statut-appel',
  templateUrl: './diagramme-statut-appel.component.html'
})
export class DiagrammeStatutAppelComponent {
  constructor(private Post: PostService) {
  }

  getDonnees = () => this.Post.postStatutsAppel();
}
