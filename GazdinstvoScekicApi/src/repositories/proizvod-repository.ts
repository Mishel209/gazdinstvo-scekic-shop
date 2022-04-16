import { getManager } from "typeorm";

const getAllProizvodi = () => {
    return getManager().query("SELECT * FROM proizvod");
}

const getProizvodByID = (pid: number) => {
    return getManager().query(`SELECT * FROM proizvod WHERE pid = ?`, [ pid ]);
}

export default { getAllProizvodi, getProizvodByID }