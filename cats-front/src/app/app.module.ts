import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EndCallDiagramComponent } from './pages/end-call-diagram/end-call-diagram.component';
import { HomeComponent } from './pages/home/home.component';
import { NgChartsModule } from 'ng2-charts';
import { CallTimeDiagramComponent } from './pages/call-time-diagram/call-time-diagram.component';
import {MatIconModule} from "@angular/material/icon";
import { TotalCallDiagramComponent } from './pages/total-call-diagram/total-call-diagram.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    EndCallDiagramComponent,
    HomeComponent,
    CallTimeDiagramComponent,
    TotalCallDiagramComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgChartsModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
