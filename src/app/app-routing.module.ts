import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiagrammeStatutAppelComponent} from "./pages/diagramme-statut-appel/diagramme-statut-appel.component";
import {DiagrammeMotifFinAppelComponent} from "./pages/diagramme-motif-fin-appel/diagramme-motif-fin-appel.component";
import {HomeComponent} from "./pages/home/home.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {DiagrammeRepartitionAppelComponent} from "./pages/diagramme-repartition-appel/diagramme-repartition-appel.component";
import {
  DiagrammeDissuasionAppelComponent
} from "./pages/diagramme-dissuasion-appel/diagramme-dissuasion-appel.component";
import {DiagrammeAttenteBulleComponent} from "./pages/diagramme-attente-bulle/diagramme-attente-bulle.component";
import {DiagrammeNombreAppelComponent} from "./pages/diagramme-nombre-appel/diagramme-nombre-appel.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'statut_appel', component: DiagrammeStatutAppelComponent},
  {path: 'dissuasion_appel', component: DiagrammeDissuasionAppelComponent},
  {path: 'motif-fin_appel', component: DiagrammeMotifFinAppelComponent},
  {path: 'repartition_appel', component: DiagrammeRepartitionAppelComponent},
  {path: 'attente_probleme', component: DiagrammeAttenteBulleComponent},
  {path: 'date_repartition_appel', component: DiagrammeNombreAppelComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
