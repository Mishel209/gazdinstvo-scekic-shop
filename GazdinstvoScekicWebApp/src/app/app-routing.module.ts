import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ProizvodComponent } from './proizvod/proizvod.component';
import { PorudzbineComponent } from './porudzbine/porudzbine.component';

//import { Full_ROUTES } from "./shared/routes/full-layout.routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pocetna',
    pathMatch: 'full',
  },
  { path: '', component: PocetnaComponent },
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'proizvodi', component: ProizvodComponent },
  { path: 'dodajProizvod', component: AddProductComponent},
  { path: 'porudzbine', component: PorudzbineComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}) 
  ],
  providers: [NgbActiveModal],
  exports: [RouterModule]
})
export class AppRoutingModule { }
