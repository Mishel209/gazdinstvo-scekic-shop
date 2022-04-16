import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {
  
  constructor(private httpClient: HttpClient) { }

  getAllProizvodi(): Observable<any> {
   return this.httpClient.get<any>("localhost:3000/proizvodi");
  }
}

