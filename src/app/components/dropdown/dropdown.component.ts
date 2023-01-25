import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {CallService} from "../../service/call.service";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'caisse-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  public rubIdCaisse: number[];
  public caisse: string[];
  public nbrCaisse: number;
  selected = '-1';

  isOpen = false;

  constructor(private data: DataService, private CallService: CallService, public cookieService: CookieService) {
    this.rubIdCaisse = [0];
    this.caisse = [""];

    if (this.cookieService.get("caisse").length == 0)
      this.cookieService.set("caisse", "-1");
    this.nbrCaisse = Number(this.cookieService.get("caisse"));

    this.data.current.subscribe(_ => {
    });
  }

  ngOnInit(): void {
    this.initDataCalls();
  }

  private initDataCalls() {
    this.CallService.postNumberCall(Number(this.nbrCaisse)).subscribe(data => {
      console.log(data);
      this.rubIdCaisse = data.rubIdCaisse;
      this.caisse = data.caisse;

      this.selected = this.cookieService.get("caisse");
    })
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  clickedOutside() {
    this.isOpen = false;
  }

  setSelected(selected: number) {
    this.selected = selected.toString();
    this.cookieService.set("caisse", this.selected);
    this.data.setCaisse(selected);
    this.isOpen = false;
  }

  getSelectedLabel() {
    return this.getCaisses().find(caisse => caisse.id.toString() == this.selected)?.label;
  }

  getCaisses() {
    let caisses = [];

    for (let i = 0; i < this.rubIdCaisse.length; i++) {
      caisses.push({id: this.rubIdCaisse[i], label: this.caisse[i]});
    }

    return caisses;
  }
}
