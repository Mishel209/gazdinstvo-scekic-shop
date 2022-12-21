import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProizvodSaZalihom } from 'src/app/models/proizvod-sa-zalihom.model';


@Injectable({
  providedIn: 'root'
})
export class GeografijaService {
  
 
  
  constructor(private httpClient: HttpClient) { }

  
  getAllDrzava(): Observable<any[]> {
    return this.httpClient.get<any[]>("http://localhost:3000/drzava");

}

getGradoviByIdDrzave(drzava_id: number): Observable<any[]> {
  return this.httpClient.get<any[]>(`http://localhost:3000/grad/${drzava_id}`);
}
}

