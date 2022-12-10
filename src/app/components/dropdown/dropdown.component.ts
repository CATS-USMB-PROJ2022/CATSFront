import {Component} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

interface CaisseRegionale {
  viewValue: string;
  valueOld: number;
  valueNew: number;
}

@Component({
  selector: 'caisse-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  isOpen = false;
  selected = 'All';
  nbrCaisse: number;

  toggle = (): void => {
    this.isOpen = !this.isOpen;
  };

  setSelected(caisse: CaisseRegionale | null) {
    this.selected = caisse?.viewValue ?? 'All';
    this.nbrCaisse = caisse?.valueOld ?? -1;
    this.isOpen = false;
    this.recupCaisse();
  }

  clickedOutside(): void {
    this.isOpen = false;
  }

  caisses: CaisseRegionale[] = [
    {viewValue: 'Caisse Régionale des Savoie', valueOld: 881, valueNew: 88100},
    {viewValue: 'Caisse Régionale d\'Île-de-France', valueOld: 882, valueNew: 88200},
    {viewValue: 'Caisse Régionale de Loire et Haute-Loire', valueOld: 848, valueNew: 84800},
  ];

  constructor(public cookieService: CookieService) {
    if (this.cookieService.get("caisse").length == 0) {
      this.cookieService.set("caisse", "-1");
    }
    this.nbrCaisse = Number(this.cookieService.get("caisse"));


  }

  public recupCaisse() {
    this.cookieService.set("caisse", this.selected);
    if (this.selected != "All") {
      this.nbrCaisse = Number(this.selected);
    } else {
      this.nbrCaisse = -1;
    }

    // this.initDataCalls(this.nbrCaisse, this.start_date, this.end_date, this.start_time, this.end_time);
    //this.getDataStatus();
  }
}
