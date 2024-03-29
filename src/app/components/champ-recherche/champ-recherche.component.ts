import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'champ-recherche',
  templateUrl: './champ-recherche.component.html',
  styleUrls: ['./champ-recherche.component.css']
})
export class ChampRechercheComponent implements OnInit {
  @Output() recherche = new EventEmitter<string>();
  @Input() placeholder = "Rechercher...";

  input_recherche: FormControl = new FormControl();

  ngOnInit(): void {
    this.input_recherche.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(text => this.recherche.emit(text));
  }
}
