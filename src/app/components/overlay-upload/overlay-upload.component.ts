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
  // Boolean pour indiquer si l'upload est encore en cours
  upload_en_cours: boolean = false;

  // Initialisation sur un fichier vide
  fichiers: File[] = [];

  is_overlay_ouvert = false;
  ouverture_en_cours = false;

  erreur: boolean = false;
  messageErreur: string = 'Veuillez sélectionner un fichier.';

  constructor(private StockageCookie: StockageCookieService, private CaisseRegionale: CaisseRegionaleService, private Post: PostService) {
  }

  getFileName(): string {
    return this.isFichiersEmpty() ? 'Parcourir...' : `${this.fichiers.length} fichier${this.fichiers.length == 1 ? '' : 's'} sélectionné${this.fichiers.length == 1 ? '' : 's'}`;
  }

  async ouvrirOverlay() {
    this.is_overlay_ouvert = true;
    this.ouverture_en_cours = true;

    // Pause marquée afin d'éviter une fermeture instantanée
    await new Promise(f => setTimeout(f, 1000));

    this.ouverture_en_cours = false;
  }

  fermerOverlay() {
    if (!this.ouverture_en_cours) this.is_overlay_ouvert = false;
  }

  isFichiersEmpty(): boolean {
    return this.fichiers.length == 0;
  }

  onSelectionFichier(event: Event) {
    this.erreur = false;
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) this.fichiers = this.fichiers.concat(Array.from(target.files));
    else this.erreur = true;
  }

  supprimerFichier(fichier: File) {
    this.is_overlay_ouvert = true;
    this.fichiers = this.fichiers.filter(f => f != fichier);
  }

  upload() {
    if (this.isFichiersEmpty()) {
      this.erreur = true;
      this.messageErreur = 'Veuillez sélectionner un fichier.';
      return;
    }

    this.upload_en_cours = true;

    // try {
      this.Post.postUploadFichiers(this.fichiers).subscribe((event: any) => {
          if (typeof (event) === 'object') {

            this.upload_en_cours = false;

            this.erreur = false;

            this.fichiers = [];
            this.fermerOverlay();
            this.CaisseRegionale.setCaisse(this.StockageCookie.getCaisseRegionale());
          }
        }
      );
    // } catch (e: ) {
    //   const {status, statusText} = e;
    //
    //   if (status === 500) {
    //     this.erreur = true;
    //     this.messageErreur = statusText;
    //     return;
    //   }
    // }
  }
}
