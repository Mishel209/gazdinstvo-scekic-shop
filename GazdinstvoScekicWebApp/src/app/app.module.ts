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
import { ProizvodComponent } from './proizvod/proizvod.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProizvodService } from './shared/services/proizvod.service';
import { SidebarService } from './shared/sidebar/sidebar.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditProizvodComponent } from './edit-proizvod/edit-proizvod.component'
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [
    AppComponent,
    ProizvodComponent,
    PocetnaComponent,
    SidebarComponent,
    EditProizvodComponent,
    AddProductComponent
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
    FormsModule
  ],
  
  exports: [
    FontAwesomeModule
  ],
  
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    ProizvodService,
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
