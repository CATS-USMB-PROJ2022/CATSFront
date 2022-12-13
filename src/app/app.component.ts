import { Component } from '@angular/core';
import {UploadService} from "./service/upload.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cats-front';

  //boolean pour indiquer si l'upload est encore en cours
  loading: boolean = false;
  //initialisation sur un fichier vide
  file: File = new File([], "");

  constructor(private uploadService: UploadService) {}
  //recuperation du fichier selectionné
  onFileChange(event: any) {
    console.log("file changed");
    this.file = event.target.files[0];
  }

  //lancement de l'upload du fichier vers l'api
  onFileUpload() {
    console.log("file upload started");
    this.loading = true;
    this.uploadService.postFileUpload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.loading = false;
          console.log("file upload finished");
        }
      }
    );
  }

  isOverlayOpen = false;
  opening = false;

  error: boolean = false;

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

  getFileName(): string {
    return this.file ? this.file.name : 'Parcourir...';
  }

  onChange(event: Event) {
    this.error = false;
    const target = event.target as HTMLInputElement;

    if (target.files) {
      this.file = target.files[0];
    } else {
      this.error = true;
    }
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
        }
      }
    );
  }
}
