import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {
  searchInput: FormControl = new FormControl();
  @Input() placeholder = "Search";
  @Output() search = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(text => this.search.emit(text));
  }
}
