export class Post {
  RUB_ID_CAISSE:number
  START:string
  END:string
  RUB_TYPENUM:string
  GT_APPELE_ID:string

  constructor(caisse:number, start:string, end:string, rub:string, gt:string) {
    this.RUB_ID_CAISSE=caisse;
    this.START=start;
    this.END=end;
    this.RUB_TYPENUM=rub;
    this.GT_APPELE_ID=gt;
  }
}
