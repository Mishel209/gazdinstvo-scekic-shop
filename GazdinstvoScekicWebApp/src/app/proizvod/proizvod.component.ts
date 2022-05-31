import { Component, OnInit } from '@angular/core';
import { ProizvodService } from '../shared/services/proizvod.service';
import { faFilm, faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProizvodComponent } from '../edit-proizvod/edit-proizvod.component';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  //styleUrls: ['./proizvod.component.scss']
})
export class ProizvodComponent implements OnInit {

  proizvodi = [];
  faTimes = faPencilSquare;
  constructor(
    private proizvodService: ProizvodService,
    private modalService: NgbModal
    ) { }
  
  ngOnInit(): void {
    this.proizvodService.getAllProizvodiSaTipom().subscribe(res=>{
      console.log ("ProizvodComponent - Proizvodi: " + JSON.stringify(res));
      this.proizvodi = res;
    });
  }
  
  openEditProizvodModal(proizvodId:number){
    const modalRef = this.modalService.open(EditProizvodComponent, {size: 'lg'}); 
    modalRef.componentInstance.proizvodId = proizvodId ;
  };

}
