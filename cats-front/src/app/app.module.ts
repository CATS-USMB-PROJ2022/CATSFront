import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AppRoutingModule } from './app-routing.module';
import {MatIconModule} from "@angular/material/icon";
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EndCallDiagramComponent } from './pages/end-call-diagram/end-call-diagram.component';
import { StatusCallDiagramComponent } from './pages/status-call-diagram/status-call-diagram.component';
import { HomeComponent } from './pages/home/home.component';
import { TotalCallDiagramComponent } from './pages/total-call-diagram/total-call-diagram.component';
import { PartnairCallComponent } from './pages/partnair-call/partnair-call.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    EndCallDiagramComponent,
    StatusCallDiagramComponent,
    HomeComponent,
    TotalCallDiagramComponent,
    PartnairCallComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgChartsModule,
        MatIconModule,
        NgxGraphModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
