import {Component, OnInit} from '@angular/core';
import {CallService} from "../../service/call.service";
import {CookieService} from "ngx-cookie-service";
import {ValueService} from "../../service/value.service";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'non-open-filter',
  templateUrl: './non-open-filter.component.html',
  styleUrls: ['./non-open-filter.component.css']
})
export class NonOpenFilterComponent implements OnInit {
  public openHours: boolean;
  public nonOpenHours: boolean;

  constructor(private callService: CallService, private cookieService: CookieService, private data: DataService, private valueService: ValueService) {
    this.openHours = true;
    this.nonOpenHours = false;

    if (this.cookieService.get("hno") == "") {
      this.cookieService.set("hno", this.getValueFromCheckboxes().toString());
    }
    this.setValue(Number(this.cookieService.get("hno")));
  }

  ngOnInit(): void {
  }

  public setOpenHours() {
    if (!this.openHours) this.nonOpenHours = true;
  }

  public setNonOpenHours() {
    if (!this.nonOpenHours) this.openHours = true;
  }

  setValue(v: number) {
    switch (v) {
      case -1:
        this.openHours = true;
        this.nonOpenHours = true;
        break;
      case 0:
        this.openHours = false;
        this.nonOpenHours = true;
        break;
      case 1:
        this.openHours = true;
        this.nonOpenHours = false;
        break;
    }
  }

  getValueFromCheckboxes(): number {
    if (this.openHours && !this.nonOpenHours) return 0;
    else if (!this.openHours && this.nonOpenHours) return 1;
    else return -1;
  }

  public updateHours() {
    this.cookieService.set("hno", this.getValueFromCheckboxes().toString());
    this.callService.postNumberCall().subscribe(data => {
      this.valueService.setValues(data);
    });
  }
}
