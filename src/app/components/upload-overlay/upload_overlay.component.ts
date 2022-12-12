import {Component, OnInit} from '@angular/core';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'upload-overlay',
  templateUrl: './upload_overlay.component.html',
  styleUrls: ['./upload_overlay.component.css']
})
export class UploadOverlayComponent implements OnInit {
  shortLink: string = "";
  loading: boolean = false;
  file: File | null = null;

  error: boolean = false;

  ngOnInit(): void {
  }

  closeOverlay() {

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
    this.loading = !this.loading;
    console.log(this.file);

    if (!this.file) {
      this.error = true;
      return;
    }

    /*this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable
          this.error = false;
        }
      }
    );*/
  }
}
