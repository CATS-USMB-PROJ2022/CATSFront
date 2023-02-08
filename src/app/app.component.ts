import {Component, OnInit} from '@angular/core';
import {CallService} from './service/call.service';
import {DataService} from "./service/data.service";
import {ValueService} from "./service/value.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cats-front';

  constructor(private data: DataService, private values: ValueService, private CallService: CallService) {
    this.data.current.subscribe(_ => this.initDataCalls());
  }

  ngOnInit(): void {
    this.data.current.subscribe(_ => this.initDataCalls());
    this.initDataCalls();
  }

  private initDataCalls() {
    this.CallService.postNumberCall().subscribe(data => {
      console.log(data);
      this.values.setValues(data);
    })
  }
}
