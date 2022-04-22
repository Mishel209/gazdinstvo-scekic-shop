import { getManager } from "typeorm";

const getAllProizvodi = () => {
    return getManager().query("SELECT * FROM proizvod");
}
const getAllProizvodiSaTipom = () => {
    return getManager().query("SELECT proizvod.id,proizvod.naziv, proizvod.opis, tip_proizvoda.naziv AS nazivTipaProizvoda  FROM proizvod INNER JOIN tip_proizvoda ON proizvod.tip_proizvoda_id = tip_proizvoda.id");
}
const getProizvodByID = (pid: number) => {
    return getManager().query(`SELECT * FROM proizvod WHERE pid = ?`, [ pid ]);
}

export default { getAllProizvodi, getProizvodByID, getAllProizvodiSaTipom }