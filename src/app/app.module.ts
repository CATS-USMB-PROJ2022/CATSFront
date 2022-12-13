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
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {EndCallDiagramComponent} from './pages/end-call-diagram/end-call-diagram.component';
import {StatusCallDiagramComponent} from './pages/status-call-diagram/status-call-diagram.component';
import {HomeComponent} from './pages/home/home.component';
import {TotalCallDiagramComponent} from './pages/total-call-diagram/total-call-diagram.component';
import {PartnairCallComponent} from './pages/partnair-call/partnair-call.component';
import {CallService} from './service/call.service';
import {CookieService} from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {DropdownComponent} from "./components/dropdown/dropdown.component";
import {ClickOutsideDirective} from "./directives/click-outside/clicked_outside.directive";
import {CaretUpComponent} from "./components/icons/carets/caret_up.component";
import {CaretDownComponent} from "./components/icons/carets/caret_down.component";
import {SearchComponent} from "./components/icons/search.component";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    EndCallDiagramComponent,
    StatusCallDiagramComponent,
    HomeComponent,
    TotalCallDiagramComponent,
    PartnairCallComponent,

    DropdownComponent,
    CaretUpComponent,
    CaretDownComponent,

    SearchComponent,

    ClickOutsideDirective,
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
    NgxMaterialTimepickerModule,
    MatSelectModule
  ],
  providers: [
    CallService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
