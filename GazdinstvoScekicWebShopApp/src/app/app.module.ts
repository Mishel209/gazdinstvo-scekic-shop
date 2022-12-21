import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

import * as $ from 'jquery';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarService } from './shared/services/sidebar/sidebar.service';
import { ProizvodService } from './shared/services/proizvod.service';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { KorpaComponent } from './korpa/korpa.component';
import { MesssageService } from './shared/services/message.service';



@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    NavbarComponent,
    ProductsGridComponent,
    KorpaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    // AgmCoreModule.forRoot({apiKey: 'AIzaSyDKXKdHQdtqgPVl2HI2RnUa_1bjCxRCQo4'}),
    PerfectScrollbarModule,
    FontAwesomeModule,
    FormsModule,
  ],
  
  exports: [
  FontAwesomeModule
  ],
  
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
   SidebarService, ProizvodService, MesssageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
