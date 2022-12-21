import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ProizvodSaZalihom } from 'src/app/models/proizvod-sa-zalihom.model';


@Injectable({
  providedIn: 'root'
})
export class MesssageService {
  
  private subjectNumberOfProducts = new Subject<any>();
  public products: any[] = [];
  public totalItems: number;

  constructor() { }

  sendNewProductToBasket(product: any) {
    let index = this.products.findIndex(d => d.id === product.id)
    if(index != -1)
    {
      alert("Proizvod je vec u korpi");
      return;
    }
    this.products.push(product);
    this.totalItems = this.products.length;
    this.subjectNumberOfProducts.next(this.totalItems);
  }

  removeProductFromBasket(product: any) {
    let index = this.products.findIndex(d => d.id === product.id); //find index in your array
    this.products.splice(index, 1);//remove element from array
    this.totalItems = this.products.length;
    this.subjectNumberOfProducts.next(this.totalItems);
  }

  getNumberOfProducts():Observable<number> {
    return this.subjectNumberOfProducts.asObservable();
  }

}

