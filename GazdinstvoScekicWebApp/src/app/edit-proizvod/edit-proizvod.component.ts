import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ProizvodSaZalihom } from '../models/proizvod-sa-zalihom.model';
import { ProizvodService } from '../shared/services/proizvod.service';

@Component({
  selector: 'app-edit-proizvod',
  templateUrl: './edit-proizvod.component.html',
  styleUrls: ['./edit-proizvod.component.scss']
})
export class EditProizvodComponent implements OnInit {

  @Input() proizvodId; 
  proizvodSaZalihama: ProizvodSaZalihom;

  constructor(
     public activeModal: NgbActiveModal,
     private proizvodService: ProizvodService
    ) { }

  ngOnInit(): void {  
     console.log ("EditProizvodComponent - proslijedjeni id: " + this.proizvodId)
     this.proizvodService.getProizvodSaZalihama(this.proizvodId).subscribe(res=>{
      console.log ("EditProizvodComponent - Proizvod sa zalihama: " + JSON.stringify(res));
      this.proizvodSaZalihama = res;
    })
  }



}







