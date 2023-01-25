import {Component, Input, OnInit} from '@angular/core';
import {CallService} from './service/call.service';
import {UploadService} from "./service/upload.service";
import {DataService} from "./service/data.service";
import {CookieService} from "ngx-cookie-service";
import {Filtre} from "./pages/home/home.component";
import {Time} from "@angular/common";
import {DateRange} from "@angular/material/datepicker";
import {FormControl, FormGroup} from "@angular/forms";
import {ValueService} from "./service/value.service";

const default_date_start = new Date(0);
const default_date_end = new Date();
default_date_end.setFullYear(2023);

const default_time_start: Time = {hours: 0, minutes: 0};
const default_time_end: Time = {hours: 23, minutes: 59};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cats-front';

  constructor(private data: DataService, private values: ValueService, private CallService: CallService, private cookieService: CookieService, private uploadService: UploadService) {
    this.gtAppele = [""];
    this.gtAppeleId = [""];
    this.rubTypeNum = [""];
    this.start_date = default_date_start;
    this.end_date = default_date_end;
    this.start_time = default_time_start;
    this.end_time = default_time_end;

    if (this.cookieService.get("start_date") == "") {
      this.cookieService.set("start_date", this.start_date.toString());
    }
    this.start_date = new Date(this.cookieService.get("start_date"));

    if (this.cookieService.get("end_date") == "") {
      this.cookieService.set("end_date", this.end_date.toString());
    }
    this.end_date = new Date(this.cookieService.get("end_date"));

    if (this.cookieService.get("start_time") == "") {
      this.cookieService.set("start_time_hours", this.start_time.hours.toString());
      this.cookieService.set("start_time_minutes", this.start_time.minutes.toString());
    }
    this.start_time.hours = Number(this.cookieService.get("start_time_hours"));
    this.start_time.minutes = Number(this.cookieService.get("start_time_minutes"));

    if (this.cookieService.get("end_time") == "") {
      this.cookieService.set("end_time_hours", this.end_time.hours.toString());
      this.cookieService.set("end_time_minutes", this.end_time.minutes.toString());
    }
    this.end_time.hours = Number(this.cookieService.get("end_time_hours"));
    this.end_time.minutes = Number(this.cookieService.get("end_time_minutes"));

    this.filtreGt = {
      name: 'GT APPELE',
      completed: true,
      subfiltres: this.getGtAppele(),
    };

    this.filtreAgence = {
      name: 'AGENCE',
      completed: true,
      subfiltres: this.getAgences(),
    };

    this.data.current.subscribe(_ => this.initDataCalls());
  }

  ngOnInit(): void {
    this.data.current.subscribe(_ => this.initDataCalls());
    this.initDataCalls();
  }

  private initDataCalls() {
    this.CallService.postNumberCall(this.getCookieCaisse()).subscribe(data => {
      console.log(data);
      this.values.setValues(data);
      this.gtAppeleId = data.gtAppeleId;
      this.gtAppele = data.gtAppele;
      this.rubTypeNum = data.rubTypenum;

      this.miseJourGtAppel();
      this.miseJourAgences();
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Filters //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  public filtreGt: Filtre;
  public filtreAgence: Filtre;
  public gtAppele: string[];
  public gtAppeleId: string[];
  public rubTypeNum: string[];

  public getCookieCaisse() {
    return Number(this.cookieService.get("caisse"));
  }

  public getGtAppele(): Filtre[] {
    if (this.cookieService.get("gt") == "") this.cookieService.set("gt", "[]");
    let selectedGt = JSON.parse(this.cookieService.get("gt"));

    let filtres: Filtre[] = [];
    console.log(this.gtAppele)

    for (let index = 0; index < this.gtAppele.length; index++) {
      filtres[index] = {name: this.gtAppele[index], completed: selectedGt.includes(this.gtAppeleId[index])};
    }
    return filtres;
  }

  public getAgences(): Filtre[] {
    if (this.cookieService.get("agences") == "") {
      this.cookieService.set("agences", "[]");
    }
    let selectedAgences = JSON.parse(this.cookieService.get("agences"));

    let filtres: Filtre[] = [];
    console.log(this.rubTypeNum);

    for (let index = 0; index < this.rubTypeNum.length; index++) {
      filtres[index] = {name: this.rubTypeNum[index], completed: selectedAgences.includes(this.rubTypeNum[index])};
    }

    return filtres;
  }

  setAllGt(completed: boolean) {
    if (this.filtreGt.subfiltres == null) return;
    if (completed) this.setAllAgences(false);
    this.filtreGt.subfiltres.forEach(t => (t.completed = completed));
  }

  setAllAgences(completed: boolean) {
    if (this.filtreAgence.subfiltres == null) return;
    if (completed) this.setAllGt(false);
    this.filtreAgence.subfiltres.forEach(t => (t.completed = completed));
  }

  setGtSelected() {
    this.setAllAgences(false);
  }

  setAgenceSelected() {
    this.setAllGt(false);
  }

  miseJourGtAppel() {
    this.filtreGt = {
      name: 'GT APPELE',
      completed: true,
      subfiltres: this.getGtAppele(),
    };
  }

  miseJourAgences() {
    this.filtreAgence = {
      name: 'AGENCES',
      completed: true,
      subfiltres: this.getAgences(),
    };
  }

  public updateFiltres() {
    let filtresGt = this.filtreGt.subfiltres ? this.filtreGt.subfiltres : [];
    let gt: string[];
    gt = [];

    let filtresAgence = this.filtreAgence.subfiltres ? this.filtreAgence.subfiltres : [];
    let agences: string[];
    agences = [];

    for (let i = 0; i < filtresGt.length; i++) {
      let id = this.gtAppeleId[i];
      let {completed} = filtresGt[i];
      if (completed) {
        gt.push(id);
      }
    }

    for (let {name, completed} of filtresAgence) {
      if (completed) {
        agences.push(name);
      }
    }

    this.cookieService.set("gt", JSON.stringify(gt));
    this.cookieService.set("agences", JSON.stringify(agences));

    this.getDataCalls();
  }

  private getDataCalls() {
    this.CallService.postNumberCall(this.getCookieCaisse()).subscribe(data => {
      this.values.setValues(data);
      this.gtAppeleId = data.gtAppeleId;
      this.gtAppele = data.gtAppele;
      this.rubTypeNum = data.rubTypenum;
    })
  }

  ////////////////////////////////////////////////////////////////////////
  //// Date / Time Picker ////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  @Input() selectedRangeValue: DateRange<Date> | undefined;

  public start_date: Date;
  public end_date: Date;
  public start_time: Time;
  public end_time: Time;

  horaires = new FormGroup({
    start: new FormControl<Time | null>(null),
    end: new FormControl<Time | null>(null),
  });

  recupDate(m: Date) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      this.selectedRangeValue = end < start ? new DateRange<Date>(end, start) : new DateRange<Date>(start, end);
      //@ts-ignore
      this.cookieService.set("start_date", start.toString());
      //@ts-ignore
      this.cookieService.set("end_date", end.toString());
    }

    this.start_date = this.selectedRangeValue.start ?? default_date_start;
    this.end_date = this.selectedRangeValue.end ?? default_date_end;
  }

  public recupHoraire() {
    this.start_time = this.horaires.value.start ?? default_time_start;
    this.end_time = this.horaires.value.end ?? default_time_end;

    this.cookieService.set("start_time_hours", this.start_time.hours.toString());
    this.cookieService.set("start_time_minutes", this.start_time.minutes.toString())

    this.cookieService.set("end_time_hours", this.end_time.hours.toString());
    this.cookieService.set("end_time_minutes", this.end_time.minutes.toString())
  }

  applyDateTime() {
    this.getDataCalls();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Upload Overlay ///////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //// Attributes ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  // Boolean pour indiquer si l'upload est encore en cours
  loading: boolean = false;

  // Initialisation sur un fichier vide
  file: File = new File([], "");

  isOverlayOpen = false;
  opening = false;

  error: boolean = false;

  ////////////////////////////////////////////////////////////////////////
  //// Getters ///////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  getFileName(): string {
    return this.file.name != "" ? this.file.name : 'Parcourir...';
  }

  ////////////////////////////////////////////////////////////////////////
  //// Methods ///////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  async openOverlay() {
    console.log("Upload open");
    this.isOverlayOpen = true;

    this.opening = true;
    await new Promise(f => setTimeout(f, 1000));
    this.opening = false;
  }

  closeOverlay() {
    if (!this.opening) this.isOverlayOpen = false;
  }

  onChange(event: Event) {
    this.error = false;
    const target = event.target as HTMLInputElement;

    if (target.files) this.file = target.files[0];
    else this.error = true;
  }

  upload() {
    console.log(this.file);

    if (!this.file) {
      this.error = true;
      return;
    }

    this.loading = true;
    this.uploadService.postFileUpload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.loading = false;
          this.error = false;

          console.log("file upload finished");

          this.closeOverlay();
          this.data.setCaisse(Number(this.cookieService.get("caisse")));
        }
      }
    );
  }
}
