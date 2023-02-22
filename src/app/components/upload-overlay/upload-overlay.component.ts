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
  // Initialisation sur une liste de fichiers vide
  files: File[] = [];
  isOverlayOpen = false;
  opening = false;

  error: boolean = false;

  constructor(private data: DataService, private cookieService: CookieService, private uploadService: UploadService) {
    this.data.current.subscribe(_ => {});
    this.files = [this.file];
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

  // Verifie si la liste de fichiers est vide
  filesIsEmpty(): boolean {
    return this.files.length == 0;
  }

  closeOverlay() {
    if (!this.opening) this.isOverlayOpen = false;
  }


  onChange(event: Event) {
    this.error = false;
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.files = Array.from(target.files);
      this.file = this.files[0];
    }
    else this.error = true;
  }

  upload() {
    console.log(this.files);

    if (!this.file) {
      this.error = true;
      return;
    }

    this.loading = true;
    this.uploadService.postFileUpload(this.files).subscribe(
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
