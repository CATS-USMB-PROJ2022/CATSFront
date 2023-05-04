import {Component, Input} from "@angular/core";

@Component({
  selector: 'filtre[reinitialisation][confirmation]',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})
export class FiltreComponent {
  @Input() public reinitialisation: any = () => {
  };

  @Input() public confirmation: any = () => {
  };
}
