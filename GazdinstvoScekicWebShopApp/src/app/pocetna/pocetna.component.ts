import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-proizvod',
  templateUrl: './pocetna.component.html',
  //styleUrls: ['./pocetna.component.scss']
})
export class PocetnaComponent implements OnInit {

  proizvodi = [] 

  constructor() { }
  
  ngOnInit(): void {
   
  }

}
