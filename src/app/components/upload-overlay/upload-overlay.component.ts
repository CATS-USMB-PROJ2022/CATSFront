import {Component, ElementRef, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {UploadService} from "../../service/upload.service";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'upload-overlay',
  templateUrl: './upload-overlay.component.html',
  styleUrls: ['./upload-overlay.component.css']
})
export class UploadOverlayComponent {
  @ViewChild('uploadButton') uploadButton: ElementRef | undefined;

  // Boolean pour indiquer si l'upload est encore en cours
  loading: boolean = false;

  // Initialisation sur un fichier vide
  file: File = new File([], "");

  isOverlayOpen = false;
  opening = false;

  error: boolean = false;

  constructor(private data: DataService, private cookieService: CookieService, private uploadService: UploadService) {
    this.data.current.subscribe(_ => {});
  }

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
