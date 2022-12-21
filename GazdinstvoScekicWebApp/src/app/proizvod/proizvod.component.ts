import { Component, OnInit } from '@angular/core';
import { ProizvodService } from '../shared/services/proizvod.service';
import { faFilm, faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProizvodComponent } from '../edit-proizvod/edit-proizvod.component';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.scss']
})
export class ProizvodComponent implements OnInit {

  apiImgUploadUrl = environment.apiUrl;
  proizvodi = [];
  faTimes = faPencilSquare;
  showUpdateLoader: boolean;
  proizvodId : ProizvodComponent
  proizvod_id: number;
  constructor(
    private proizvodService: ProizvodService,
    private modalService: NgbModal
    ) { }
  
  ngOnInit(): void {
    this.proizvodService.getAllProizvodiSaTipom().subscribe(res=>{
      console.log ("ProizvodComponent - Proizvodi: " + JSON.stringify(res));
      console.log( JSON.stringify(res))
      this.proizvodi = res;
    });

  };

  openEditProizvodModal(proizvod_id : number){
    const modalRef = this.modalService.open(EditProizvodComponent, {size: 'lg'}); 
    modalRef.componentInstance.proizvodId = proizvod_id ;
  };

  deleteProizvod(id: number) {
    // TU POKRECES LOADER
    this.showUpdateLoader = true;
    this.proizvodService.deleteProizvodId(id).subscribe(result =>{
      console.log ("ProizvodComponent - brisanje proizvoda: " + JSON.stringify(result) )
      // TU ZAUSTAVLJAS LOADER
      this.showUpdateLoader = false;
      alert("Uspjesno ste izbrisali proizvod")
    },
    error => {
      alert(JSON.stringify(error.message));
      console.log(error);
      // TU TAKODJES ZAUSTAVLJAS LOADER
    })
  }

  
}
