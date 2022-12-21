import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProizvodSaZalihom } from 'src/app/models/proizvod-sa-zalihom.model';


@Injectable({
  providedIn: 'root'
})
export class ProizvodService {
  
 
  
  constructor(private httpClient: HttpClient) { }

  getAllProizvodi(): Observable<any> {
    console.log(`ProizvodService pozivamo getAllProizvodi: http://localhost:3000/proizvodi`)
   return this.httpClient.get<any>("http://localhost:3000/proizvodi");
  }

  getAllProizvodiSaTipom(): Observable<any> {
    console.log(`ProizvodService pozivamo getAllProizvodiSaTipom: http://localhost:3000/proizvodiSaTipom`)
    return this.httpClient.get<any>("http://localhost:3000/proizvodiSaTipom");
   }

   getProizvodSaZalihama(pid:number): Observable<ProizvodSaZalihom> {
     console.log(`ProizvodService pozivamo getProizvodSaZalihama: http://localhost:3000/proizvodiSaZalihama/${pid}`)
    return this.httpClient.get<ProizvodSaZalihom>(`http://localhost:3000/proizvodiSaZalihama/${pid}`);
   }

   getProizvodById(): Observable<any[]> {
    return this.httpClient.get<any[]>("http://localhost:3000/proizvodiSaTipom");

}
getlistaTipovaProizvoda(): Observable<any[]> {
  return this.httpClient.get<any[]>("http://localhost:3000/listaTipovaProizvoda");

}

getlistaVelicine(): Observable<any[]> {
  return this.httpClient.get<any[]>("http://localhost:3000/listaVelicine");
}

putIzmjeneProizvoda(body : ProizvodSaZalihom):  Observable<any[]> {
  return this.httpClient.put<any[]>("http://localhost:3000/sacuvajPromjene",body);
}

postAddProduct(body : ProizvodSaZalihom):  Observable<any[]> {
  return this.httpClient.post<any[]>("http://localhost:3000/addProduct",body);
}

getPorudzbine(): Observable<any[]> {
  return this.httpClient.get<any[]>("http://localhost:3000/porudzbine");
}

deleteProizvodId(proizvod_id: number): Observable<any[]> {
  return this.httpClient.delete<any[]>(`http://localhost:3000/proizvodId/${proizvod_id}`);
}


}

