import {Component} from '@angular/core';
import {PostService} from "../../service/post.service";

@Component({
  selector: 'diagramme-dissuasion-appel',
  templateUrl: './diagramme-dissuasion-appel.component.html'
})
export class DiagrammeDissuasionAppelComponent {
  constructor(private Post: PostService) {
  }

  getDonnees = () => this.Post.postDissuasionAppel();
}
