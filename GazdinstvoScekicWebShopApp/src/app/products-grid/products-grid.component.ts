import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MesssageService } from '../shared/services/message.service';
import { ProizvodService } from '../shared/services/proizvod.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {

  proizvodi = [];
  apiUrl = environment.apiUrl;
  listaTipovaProizvoda: any[];
  constructor(
    private proizvodService : ProizvodService,
    private messageService: MesssageService
  ) { }

  ngOnInit(): void {
    this.proizvodService.getAllProizvodiSaTipom().subscribe(res=>{
      console.log ("ProductsGridComponent - Proizvodi: " + JSON.stringify(res));
      this.proizvodi = res;
    });

    this.proizvodService.getlistaTipovaProizvoda().subscribe(res=>{
      this.listaTipovaProizvoda = res;
    }) 
  }
  
  dodajUkorpu(proizvod: any) {
    this.messageService.sendNewProductToBasket(proizvod);  
  }
  
}
