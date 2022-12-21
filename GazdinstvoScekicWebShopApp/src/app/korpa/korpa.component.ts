import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeografijaService } from '../shared/services/geografija.service';
import { MesssageService } from '../shared/services/message.service';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.scss']
})
export class KorpaComponent implements OnInit {

  public numberOfProducts = 0;
  public products = [];
  public totalCijena = 0;
  apiUrl = environment.apiUrl;
  public drzava: any[];
  public grad: any[];

  constructor(private messageService: MesssageService,
               private geografijaService: GeografijaService) { }

  ngOnInit(): void {
    this.products = this.messageService.products;
    this.getUkupnaCijena();

    this.geografijaService.getAllDrzava().subscribe(res=>{
      this.drzava = res;
    })
  }

  getGradovi(event: any) {

    this.geografijaService.getGradoviByIdDrzave(event.target.value).subscribe(data =>{
      this.grad = data;

     })
  }

  ukloniIzKorpe(proizvod: any){
    this.messageService.removeProductFromBasket(proizvod);
    this.products = this.messageService.products;
    this.getUkupnaCijena();
  }
  
  getUkupnaCijena() {
    this.totalCijena = 0;
    this.products.forEach( e => {
      e.kolicina_zalihe ? e.kolicina_zalihe : e.kolicina_zalihe = 1;
      this.totalCijena += +e.cijena * e.kolicina_zalihe ;
    })
  }
}
