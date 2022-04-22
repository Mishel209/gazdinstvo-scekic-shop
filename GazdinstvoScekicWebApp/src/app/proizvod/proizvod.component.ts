import { Component, OnInit } from '@angular/core';
import { ProizvodService } from '../shared/services/proizvod.service';
import { faFilm, faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  //styleUrls: ['./proizvod.component.scss']
})
export class ProizvodComponent implements OnInit {

  proizvodi = [] 
  faTimes = faPencilSquare;
  constructor(private proizvodService: ProizvodService) { }
  
  ngOnInit(): void {
    this.proizvodService.getAllProizvodiSaTipom().subscribe(res=>{
      console.log (res);
      this.proizvodi = res;
    });
  }

  

}
