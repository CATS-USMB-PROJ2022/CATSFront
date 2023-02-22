import {Component} from '@angular/core';
import {CaisseRegionaleService} from "../../service/caisse-regionale.service";
import {StockageCookieService} from "../../service/stockage-cookie.service";
import {PostService} from "../../service/post.service";

@Component({
  selector: 'overlay-upload',
  templateUrl: './overlay-upload.component.html',
  styleUrls: ['./overlay-upload.component.css']
})
export class OverlayUploadComponent {
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Attributs ////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Boolean pour indiquer si l'upload est encore en cours
  upload_en_cours: boolean = false;

  // Initialisation sur un fichier vide
  fichier: File = new File([], "");

  is_overlay_ouvert = false;
  ouverture_en_cours = false;

  erreur: boolean = false;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Constructeurs ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private StockageCookie: StockageCookieService, private CaisseRegionale: CaisseRegionaleService, private Post: PostService) { }

  ////////////////////////////////////////////////////////////////////////
  //// Getters ///////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  getFileName(): string { return this.fichier.name != "" ? this.fichier.name : 'Parcourir...'; }

  ////////////////////////////////////////////////////////////////////////
  //// Methods ///////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  async ouvrirOverlay() {
    this.is_overlay_ouvert = true;
    this.ouverture_en_cours = true;

    // Pause marquée afin d'éviter une fermeture instantanée
    await new Promise(f => setTimeout(f, 1000));

    this.ouverture_en_cours = false;
  }

  fermerOverlay() { if (!this.ouverture_en_cours) this.is_overlay_ouvert = false; }

  onSelectionFichier(event: Event) {
    this.erreur = false;
    const target = event.target as HTMLInputElement;

    if (target.files) this.fichier = target.files[0];
    else this.erreur = true;
  }

  upload() {
    console.log(this.fichier);

    if (!this.fichier) {
      this.erreur = true;
      return;
    }

    this.upload_en_cours = true;
    this.Post.postUploadFichier(this.fichier).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          this.upload_en_cours = false;
          this.erreur = false;

          console.log("Fin de l'upload du fichier");

          this.fermerOverlay();
          this.CaisseRegionale.setCaisse(this.StockageCookie.getCaisseRegionale());
        }
      }
    );
  }
}
