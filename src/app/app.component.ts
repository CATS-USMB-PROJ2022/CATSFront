import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cats-front';

  isOverlayOpen = false;
  opening = false;

  shortLink: string = "";
  loading: boolean = false;
  file: File | null = null;

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
