import { Component, OnInit } from '@angular/core';
import { ProizvodService } from '../shared/services/proizvod.service';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.scss']
})
export class ProizvodComponent implements OnInit {

  proizvodi = [] 

  constructor(private proizvodService: ProizvodService) { }
  
  ngOnInit(): void {
    this.proizvodService.getAllProizvodi().subscribe(res=>{
      console.log (res);
      this.proizvodi = res;
    });
  }

}
