import { getManager } from "typeorm";

const getAllProizvodi = () => {
    return getManager().query("SELECT * FROM proizvod");
}
const getAllProizvodiSaTipom = () => {
    return getManager().query(`SELECT 
                                proizvod.id,
                                proizvod.naziv, 
                                proizvod.opis, 
                                tip_proizvoda.naziv AS nazivTipaProizvoda  
                                FROM proizvod 
                                INNER JOIN tip_proizvoda ON proizvod.tip_proizvoda_id = tip_proizvoda.id`);
}
const getProizvodByID = (pid: number) => {
    return getManager().query(`SELECT * FROM proizvod WHERE pid = ?`, [ pid ]);
}
const getProizvodiSaZalihama = () => {
    return getManager().query(`SELECT 
                                 proizvod.id AS proizvod_id, 
                                 proizvod.naziv AS nazivProizvoda, 
                                 proizvod.opis AS opisProizvoda,
                                 zalihe.id AS zalihe_id, 
                                 zalihe.kolicina AS kolicinaZalihe, 
                                 velicina.id AS velicina_id,
                                 velicina.naziv AS nazivVelicine, 
                                 tip_proizvoda.naziv AS nazivTipaProizvoda 
                                FROM proizvod 
                                INNER JOIN zalihe ON zalihe.proizvod_id = proizvod.id
                                INNER JOIN velicina ON velicina.id = velicina.id
                                INNER JOIN tip_proizvoda ON tip_proizvoda.id = proizvod.tip_proizvoda_id`)
}

export default { getAllProizvodi, getProizvodByID, getAllProizvodiSaTipom, getProizvodiSaZalihama }