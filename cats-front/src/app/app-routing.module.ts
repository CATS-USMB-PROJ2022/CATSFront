import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EndCallDiagramComponent} from "./pages/end-call-diagram/end-call-diagram.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cause_fin_dappel', component: EndCallDiagramComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
