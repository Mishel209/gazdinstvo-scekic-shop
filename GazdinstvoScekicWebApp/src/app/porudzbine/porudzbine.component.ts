import { Component, OnInit } from '@angular/core';
import { ProizvodService } from '../shared/services/proizvod.service';

@Component({
  selector: 'app-porudzbine',
  templateUrl: './porudzbine.component.html',
  styleUrls: ['./porudzbine.component.scss']
})
export class PorudzbineComponent implements OnInit {
  porudzbine: any[];

  constructor(
    private proizvodService: ProizvodService
  ) { }

  ngOnInit(): void {

    this.proizvodService.getPorudzbine().subscribe(res=>{
      this.porudzbine = res;
    }) 

    }

}
