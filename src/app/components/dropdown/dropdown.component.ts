import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {CaisseRegionale} from "../../model/caisse";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'caisse-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  isOpen = false;
  selected = 'All';
  nbrCaisse: number;

  toggle = (): void => {
    this.isOpen = !this.isOpen;
  };

  setSelected(caisse: CaisseRegionale | null) {
    this.data.changeCaisse(caisse ?? DataService.defaultValue);
  }

  clickedOutside(): void {
    this.isOpen = false;
  }

  caisses: CaisseRegionale[] = [
    {viewValue: 'Caisse Régionale des Savoie', valueOld: 881, valueNew: 88100},
    {viewValue: 'Caisse Régionale d\'Île-de-France', valueOld: 882, valueNew: 88200},
    {viewValue: 'Caisse Régionale de Loire et Haute-Loire', valueOld: 848, valueNew: 84800},
  ];

  constructor(private data: DataService, public cookieService: CookieService) {
    if (this.cookieService.get("caisse").length == 0) {
      this.cookieService.set("caisse", "-1");
    }

    this.nbrCaisse = Number(this.cookieService.get("caisse"));
  }

  ngOnInit() {
    this.data.currentCaisse.subscribe(caisse => {
      this.selected = caisse?.viewValue ?? 'All';
      this.nbrCaisse = caisse?.valueOld ?? -1;
      this.isOpen = false;
      this.recupCaisse();
    });
  }

  public recupCaisse() {
    this.cookieService.set("caisse", this.selected);
    if (this.selected != "All") {
      this.nbrCaisse = Number(this.selected);
    } else {
      this.nbrCaisse = -1;
    }
  }
}
