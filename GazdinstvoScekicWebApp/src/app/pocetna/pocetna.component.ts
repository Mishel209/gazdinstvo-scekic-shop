import { Component, OnInit } from '@angular/core';
import { ProizvodService } from '../shared/services/proizvod.service';

@Component({
  selector: 'app-proizvod',
  templateUrl: './pocetna.component.html',
  //styleUrls: ['./pocetna.component.scss']
})
export class PocetnaComponent implements OnInit {

  proizvodi = [] 

  constructor(private proizvodService: ProizvodService) { }
  
  ngOnInit(): void {
   
  }

}
