import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { KorpaComponent } from './korpa/korpa.component';



//import { Full_ROUTES } from "./shared/routes/full-layout.routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pocetna',
    pathMatch: 'full',
  },
  { path: '', component: ProductsGridComponent },
  { path: 'pocetna', component: ProductsGridComponent },
  { path: 'korpa', component: KorpaComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}) 
  ],
  providers: [NgbActiveModal],
  exports: [RouterModule]
})
export class AppRoutingModule { }
