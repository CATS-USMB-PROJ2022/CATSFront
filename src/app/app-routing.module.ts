import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EndCallDiagramComponent} from "./pages/end-call-diagram/end-call-diagram.component";
import {StatusCallDiagramComponent} from "./pages/status-call-diagram/status-call-diagram.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {HomeComponent} from "./pages/home/home.component";
import {TotalCallDiagramComponent} from "./pages/total-call-diagram/total-call-diagram.component";
import {PartnairCallComponent} from "./pages/partnair-call/partnair-call.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'statut_appel', component: StatusCallDiagramComponent},
  {path: 'cause_fin_dappel', component: EndCallDiagramComponent},
  {path: 'call_hours', component: TotalCallDiagramComponent},
  {path: 'partnair_call', component: PartnairCallComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
