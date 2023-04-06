import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {AppRoutingModule} from './app-routing.module';
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {NgChartsModule} from 'ng2-charts';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DiagrammeStatutAppelComponent} from './pages/diagramme-statut-appel/diagramme-statut-appel.component';
import {DiagrammeDissuasionAppelComponent} from './pages/diagramme-dissuasion-appel/diagramme-dissuasion-appel.component';

import {DiagrammeMotifFinAppelComponent} from './pages/diagramme-motif-fin-appel/diagramme-motif-fin-appel.component';
import {HomeComponent} from './pages/home/home.component';
import {CookieService} from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MenuDeroulantComponent} from "./components/menu-deroulant/menu-deroulant.component";
import {CaretUpComponent} from "./components/icons/carets/caret_haut.component";
import {CaretDownComponent} from "./components/icons/carets/caret_bas.component";
import {RechercheComponent} from "./components/icons/recherche.component";
import {FiltreMultiSelectionComponent} from "./components/filtre-multi-selection/filtre-multi-selection.component";
import {FiltreDateHeureComponent} from "./components/filtre-date-heure/filtre-date-heure.component";
import {OverlayUploadComponent} from "./components/overlay-upload/overlay-upload.component";
import {ClickOutsideDirective} from "./directives/clicked-outside/clicked-outside.directive";
import {FiltreHorairesNonOuvresComponent} from "./components/filtre-horaires-non-ouvres/filtre-horaires-non-ouvres.component";
import {ChampRechercheComponent} from "./components/champ-recherche/champ-recherche.component";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {PostService} from "./service/post.service";
import {CarteIndicateurComponent} from "./components/carte-indicateur/carte-indicateur.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {
  DiagrammeRepartitionAppelComponent
} from "./pages/diagramme-repartition-appel/diagramme-repartition-appel.component";
import {FiltreComponent} from "./components/filtre/filtre.component";
import {DiagrammeCartesComponent} from "./pages/indicateurs/diagramme-cartes/diagramme-cartes.component";
import { DiagrammeAttenteBulleComponent } from './pages/diagramme-attente-bulle/diagramme-attente-bulle.component';
import { DiagrammeNombreAppelComponent } from './pages/diagramme-nombre-appel/diagramme-nombre-appel.component';
import { DiagrammeComAgentComponent } from './pages/diagramme-com-agent/diagramme-com-agent.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DiagrammeStatutAppelComponent,
    DiagrammeDissuasionAppelComponent,
    DiagrammeMotifFinAppelComponent,
    HomeComponent,
    DiagrammeRepartitionAppelComponent,

    MenuDeroulantComponent,

    CaretUpComponent,
    CaretDownComponent,
    RechercheComponent,

    OverlayUploadComponent,

    CarteIndicateurComponent,
    FiltreComponent,

    FiltreMultiSelectionComponent,
    FiltreDateHeureComponent,
    FiltreHorairesNonOuvresComponent,

    ChampRechercheComponent,

    DiagrammeCartesComponent,

    ClickOutsideDirective,
      DiagrammeAttenteBulleComponent,
      DiagrammeNombreAppelComponent,
      DiagrammeComAgentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatIconModule,
    NgxGraphModule,
    HttpClientModule,
    MatDatepickerModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatListModule,
    MatButtonModule,
  ],
  providers: [
    PostService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
