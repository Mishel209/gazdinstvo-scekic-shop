import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ProizvodSaZalihom } from '../models/proizvod-sa-zalihom.model';
import { Zalihe } from '../models/zalihe.model';
import { ProizvodService } from '../shared/services/proizvod.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input() proizvodId; 
  proizvodSaZalihama: ProizvodSaZalihom = new ProizvodSaZalihom();
  listaTipovaProizvoda: any = [];
  listaVelicine: any;
  showUpdateLoader: boolean = false;
  postAddProduct: any[];


  constructor(
    public activeModal: NgbActiveModal, 
    private proizvodService: ProizvodService ) { }

  ngOnInit(): void {
    this.proizvodService.getlistaTipovaProizvoda().subscribe(res=>{
      this.listaTipovaProizvoda = res;
    }) 

    this.proizvodService.getlistaVelicine().subscribe(res=>{
      this.listaVelicine = res;
    }) 


   

 

  }

  dodajZalihu() {
    let zaliha = new Zalihe();
    this.proizvodSaZalihama.zalihe.push(zaliha)
  }

ukloniZalihu(index : number) {

this.proizvodSaZalihama.zalihe.splice(index, 1)
}

  sacuvajIzmjene() {
    // TU POKRECES LOADER
    this.showUpdateLoader = true;
    this.proizvodService.postAddProduct(this.proizvodSaZalihama).subscribe(result =>{
      console.log (`AddProductComponent - dodavanje proizvoda: ${JSON.stringify(result)}` )
      // TU ZAUSTAVLJAS LOADER
      this.showUpdateLoader = false;
      alert("Uspjesno ste dodali proizvod")
    },
    error => {
      alert(JSON.stringify(error.message));
      console.log(error);
      // TU TAKODJES ZAUSTAVLJAS LOADER
    })
  }


}
