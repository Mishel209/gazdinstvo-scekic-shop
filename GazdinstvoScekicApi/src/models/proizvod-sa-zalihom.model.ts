import { Zalihe } from "./zalihe.model";

export class ProizvodSaZalihom {
    proizvod_id : number;
    naziv : string;
    opis : string;
    tip_proizvoda_id : number;
    naziv_tipa_proizvoda : number;
    cijena : number;
    zalihe : Zalihe[];

    constructor(){
        this.proizvod_id = 0;
        this.naziv = "";
        this.opis = "";
        this.tip_proizvoda_id = 0;
        this.naziv_tipa_proizvoda = 0;
        this.cijena = 0;
        this.zalihe = []
    }
}
