import { Zalihe } from "./zalihe.model";

export class ProizvodSaZalihom {
    proizvod_id : number;
    naziv : string;
    tip_proizvoda_id : string;
    naziv_tipa_proizvoda : number;
    zalihe : Zalihe[];
}
