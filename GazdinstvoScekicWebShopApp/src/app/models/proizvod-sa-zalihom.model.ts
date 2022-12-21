import { Zalihe } from "./zalihe.model";

export class ProizvodSaZalihom {
    proizvod_id : number;
    opis : string;
    naziv : string;
    tip_proizvoda_id : number;
    naziv_tipa_proizvoda : string;
    cijena : number;
    zalihe : Zalihe[];
    
    constructor() {
        this.proizvod_id = 0;
        this.opis = "";
        this.naziv= "";
        this.tip_proizvoda_id = 0;
        this.naziv_tipa_proizvoda = "";
        this.cijena = 0;
        this.zalihe = new Array<Zalihe>();
    }
}
