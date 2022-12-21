export class Zalihe {
    zaliha_id : number;
    velicina_id : number;
    naziv_velicine : string;
    kolicina_zalihe : number;
    datum_od : number;
    datum_do : number;
    cijena : number;
    popust : number;
    proizvod_id : number;
    
   
       constructor(){
        this.zaliha_id = 0;
        this.velicina_id = 0;
        this.naziv_velicine = "";
        this.kolicina_zalihe = 0;
        this.datum_od = 0;
         this.datum_do = 0;
         this.cijena = 0;
         this.popust = 0;
         this.proizvod_id = 0;
       
         
    }
}
