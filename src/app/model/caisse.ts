export class CaisseRegionale {
  viewValue: string;
  valueOld: number;
  valueNew: number;

  constructor(viewValue: string, valueOld: number, valueNew: number) {
    this.viewValue = viewValue;
    this.valueOld = valueOld;
    this.valueNew = valueNew;
  }
}
