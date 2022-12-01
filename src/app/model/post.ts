export class Post {
  RUB_ID_CAISSE: number
  DATE_START: string
  DATE_END: string
  RUB_TYPENUM: string[]
  GT_APPELE_ID: string[]
  TIME_START: string
  TIME_END: string

  constructor(caisse: number, date_start: string, date_end: string, time_start: string, time_end: string, rub: string[], gt: string[]) {
    this.RUB_ID_CAISSE = caisse;
    this.DATE_START = date_start;
    this.DATE_END = date_end;
    this.RUB_TYPENUM = rub;
    this.GT_APPELE_ID = gt;
    this.TIME_START=time_start;
    this.TIME_END=time_end;
  }
}
