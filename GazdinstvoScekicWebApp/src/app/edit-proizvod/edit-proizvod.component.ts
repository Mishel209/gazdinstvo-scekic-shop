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
sacuvajPromjene: any;
 

  @Input() proizvodId; 
  proizvodSaZalihama: ProizvodSaZalihom = new ProizvodSaZalihom();
  proizvodiSaTipom : any;
  listaTipovaProizvoda: any;
  listaVelicine: any;
  showUpdateLoader: boolean = false;
  uploadImage: any;
  putEditProizvod: any[];

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

    this.proizvodService.getAllProizvodiSaTipom().subscribe(res=>{
      console.log ("EditProizvodComponent - Proizvod: " + JSON.stringify(res));
      
    })
    
    this.proizvodService.getlistaTipovaProizvoda().subscribe(res=>{
      console.log ("EditProizvodComponent - lista Tipova proizvoda: " + JSON.stringify(res) )
      
      
      // NAPOMENA1: listaTipovaProizvoda je promjenjiva koju moras da stavis u ngfor
      // u select box za tip prozvoda
      // to treba da izgleda ovako:
      /*
       <option *ngFor="tipProizvoda of listaTipovaProizvoda [value]='tipProizvoda.id'>
        {{ tipProizvod.naziv }}
       </option>
      
       Bukvalno iskopiras ovo iznad tamo dje sam ti naveo
      "*/
      this.listaTipovaProizvoda = res
    }) 

    this.proizvodService.getlistaVelicine().subscribe(res=>{
      console.log ("EditProizvodComponent - lista Velicina: " + JSON.stringify(res) )
      this.listaVelicine = res
    });
  }
  sacuvajIzmjene() {
      
      // TU POKRECES LOADER
      this.showUpdateLoader = true;
      this.proizvodService.putIzmjeneProizvoda(this.proizvodSaZalihama).subscribe(result =>{
        console.log ("EditProizvodComponent - izmjena proizvoda: " + JSON.stringify(result) )
        
        // TU ZAUSTAVLJAS LOADER
        this.showUpdateLoader = false;
        alert("Uspjesno ste izmijenili proizvod")
      },
      function (error) {
          alert(JSON.stringify(error.message));
          console.log(error);
          // TU TAKODJES ZAUSTAVLJAS LOADER
        });

        
  };

  processFile(imageInput : any) {
  
    const file:File = imageInput.target.files[0];
  
      this.proizvodService.uploadImage(file).subscribe(
        (res) => {
          console.log("Fajl uspjesno uploadovan");
          this.proizvodSaZalihama.slikaNaziv = file.name;
          console.log(res);
        },
         (err) => {
          console.log("Fajl neuspjesno uploadovan");
          console.log(err);
         });
  
  }
}
