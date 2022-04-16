import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProizvodComponent } from './proizvod/proizvod.component';

import { Full_ROUTES } from "./shared/routes/full-layout.routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pocetna',
    pathMatch: 'full',
  },
  { path: '', component: PocetnaComponent },
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'proizvodi', component: ProizvodComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
