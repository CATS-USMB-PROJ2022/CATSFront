import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EndCallDiagramComponent} from "./pages/_deprecated/end-call-diagram/end-call-diagram.component";
import {DiagrammeStatutAppelComponent} from "./pages/diagramme-statut-appel/diagramme-statut-appel.component";
import {DiagrammeMotifFinAppelComponent} from "./pages/diagramme-motif-fin-appel/diagramme-motif-fin-appel.component";
import {HomeComponent} from "./pages/home/home.component";
import {TotalCallDiagramComponent} from "./pages/_deprecated/total-call-diagram/total-call-diagram.component";
import {PartnairCallComponent} from "./pages/_deprecated/partnair-call/partnair-call.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {DiagrammeRepartitionAppelComponent} from "./pages/diagramme-repartition-appel/diagramme-repartition-appel.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'statut_appel', component: DiagrammeStatutAppelComponent},
  {path: 'motif-fin_appel', component: DiagrammeMotifFinAppelComponent},
  {path: 'repartition_appel', component: DiagrammeRepartitionAppelComponent},
  // {path: 'cause_fin_dappel', component: EndCallDiagramComponent},
  // {path: 'call_hours', component: TotalCallDiagramComponent},
  // {path: 'partnair_call', component: PartnairCallComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
