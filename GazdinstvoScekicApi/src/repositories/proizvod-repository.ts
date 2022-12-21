import { getManager, UpdateResult } from "typeorm";
import _, { pick } from "lodash";
import { ProizvodSaZalihom } from "../models/proizvod-sa-zalihom.model";
import{Cjenovnik} from "../models/cjenovnik.model";

function getAllProizvodi() {

    return getManager().query(`SELECT * FROM proizvod`);
}
const getAllProizvodiSaTipom = () => {
    return getManager().query(`SELECT 
                                proizvod.id,
                                proizvod.naziv, 
                                proizvod.opis,
                                cjenovnik.cijena,
                                tip_proizvoda.naziv AS nazivTipaProizvoda,
                                slika.putanja AS slikaNaziv
                                FROM proizvod 
                                INNER JOIN tip_proizvoda ON proizvod.tip_proizvoda_id = tip_proizvoda.id
                                INNER JOIN slika ON slika.proizvod_id = proizvod.id
                                INNER JOIN cjenovnik ON proizvod.id = cjenovnik.proizvod_id`);
}
const getProizvodByID = (pid: number) => {
    return getManager().query(`SELECT * FROM proizvod WHERE pid = ? && naziv = ?`, [ pid ]);
}
const getlistaTipovaProizvoda = () => {
    return getManager().query(`SELECT * FROM tip_proizvoda`);
}

const getDrzava = () => {
    return getManager().query(`SELECT * FROM drzava`);
}

const getGrad = (id: number) => {
    return getManager().query( `SELECT g.id,  g.drzava_id, g.naziv_grada 
                                FROM grad g 
                                INNER JOIN drzava d
                                ON g.drzava_id = d.id
                                WHERE g.drzava_id = ?` , [id]);
    
}


async function deleteProizvodId(id: number) {
    console.log("id");
    console.log(id);
    //TODO: Treba staviti ova dva upita pod jednu transakciju
    await getManager().query(`DELETE FROM zalihe WHERE proizvod_id = ${id}`);
    await getManager().query(`DELETE FROM proizvod WHERE id = ${id}`);
    return true;
}

const getPorudzbine = async () => {
                        let  queryResult = await getManager().query(`SELECT 
                        proizvod.naziv AS naziv_proizvoda,
                        proizvod.opis AS opis_proizvoda,
                        proizvod.tip AS tip_proizvoda,
                        cjenovnik.cijena AS cijena,
                        cjenovnik.velicina AS velicina,
                        velicina.naziv AS naziv_velicine,
                        velicina.opis AS opis_velicine
                        korpa.tip_statusa_korpe AS tip_statusa_korpe,
                        korpa.kupac AS kupac
                        FROM proizvod
                        INNER JOIN cjenovnik ON cjenovnik.proizvod_id = proizvod.id
                        INNER JOIN velicina ON tip_velicine = proizvod.tip_velicine
                        INNER JOIN tip_statusa_korpe ON tip_ststusa_korpe.id = proizvod.tip_statusa_korpe
                        INNER JOIN korpa ON kupac.id = proizvod.kupac_id`);
}

function getlistaVelicine(pid: number) {
    return getManager().query(`SELECT * FROM velicina`);
}

async function postAddProduct(proizvod: ProizvodSaZalihom) {
    //TODO: Treba napraviti ova 4 insert upita da budu u okviru jedne transakcije
    console.log(proizvod);
    let insertProizvodResult = await getManager().query(`INSERT INTO proizvod 
    ( naziv, opis, tip_proizvoda_id)
    VALUES  ("${proizvod.naziv}",
            "${proizvod.opis}",
            "${proizvod.tip_proizvoda_id}")`)
     

    await getManager().query(`INSERT INTO slika 
    ( putanja, tip_slike_id, proizvod_id)
    VALUES  ("${proizvod.slikaNaziv}",
            ${1},
            "${insertProizvodResult["insertId"]}")`);

     proizvod.zalihe.forEach(async (zaliha) => {
        await getManager().query(`INSERT INTO zalihe
        (kolicina, velicina_id, proizvod_id)
      VALUES ("${zaliha.kolicina_zalihe}",
            "${zaliha.velicina_id}",
            "${insertProizvodResult["insertId"]}")`);
    });

    proizvod.zalihe.forEach(async (cjenovnik) => {
        await getManager().query(`INSERT INTO cjenovnik
        ( cijena, velicina_id, proizvod_id)
      VALUES (
            "${cjenovnik.cijena}",
            "${cjenovnik.velicina_id}",
            "${insertProizvodResult["insertId"]}")`);
    });
    return true;
}

async function putIzmjeneProizvoda(proizvod: ProizvodSaZalihom) {
    console.log(proizvod);
    let insertProizvodResult = await getManager().query(`UPDATE proizvod
    SET 
    naziv = "${proizvod.naziv}",
    opis = "${proizvod.opis}",
    tip_proizvoda_id = "${proizvod.tip_proizvoda_id}"
    WHERE id = "${proizvod.proizvod_id}"`);

    proizvod.zalihe.forEach(async (zaliha) => {
        await getManager().query(`UPDATE zalihe
        SET 
        kolicina = "${zaliha.kolicina_zalihe}"
        WHERE id = "${zaliha.zaliha_id}"`);

        proizvod.zalihe.forEach(async (cjenovnik) => {
            console.log("----------------------------------")
            console.log(JSON.stringify(cjenovnik))
            await getManager().query(`UPDATE cjenovnik
            SET 
            cijena = "${cjenovnik.cijena}",
            velicina_id = "${cjenovnik.velicina_id}",
            proizvod_id = "${cjenovnik.proizvod_id}"
            WHERE id = "${cjenovnik.proizvod_id}"`);
        });
    
    });

    return true;
}

const getProizvodiSaZalihama = async (proizvod_id: number) => {
                                  let  queryResult = await getManager().query(`SELECT 
                                  proizvod.id AS proizvod_id, 
                                  proizvod.naziv AS naziv_proizvoda, 
                                  proizvod.opis AS opis,
                                  cjenovnik.cijena AS cijena,
                                  zalihe.id AS zaliha_id, 
                                  zalihe.kolicina AS kolicina_zalihe,
                                  velicina.id AS velicina_id,
                                  velicina.naziv AS naziv_velicine, 
                                  tip_proizvoda.naziv AS naziv_tipa_proizvoda,
                                  tip_proizvoda.id AS tip_proizvoda_id
                                   FROM proizvod  
                                   INNER JOIN zalihe ON zalihe.proizvod_id = proizvod.id 
                                   INNER JOIN velicina ON velicina.id = zalihe.velicina_id 
                                   LEFT JOIN cjenovnik ON proizvod.id = cjenovnik.proizvod_id 
                                   INNER JOIN tip_proizvoda ON tip_proizvoda.id = proizvod.tip_proizvoda_id 
                                   WHERE proizvod.id = ${proizvod_id}`);

        let zaliheFlat = JSON.parse(JSON.stringify(queryResult));
        let poljaZaGrupisanje = ['proizvod_id', 'naziv_proizvoda' ,'opis','naziv_tipa_proizvoda','tip_proizvoda_id'];
        
        // prvi nivo grupisanja, 
        let grupisaniProizvodi = _.groupBy(zaliheFlat, function(note){
              return _.find(_.pick(note, poljaZaGrupisanje));
        });

        let proizvodiIds = Object.keys(grupisaniProizvodi);
        let proizvodSaZalihom:any = new Object();

        //L1: prolazimo kroz PROIZVODE
        proizvodiIds.forEach(p_id => {
            proizvodSaZalihom.zalihe = [];
            //L2: prolazimo kroz ZALIHE
            Object.values(grupisaniProizvodi[p_id]).forEach( zalihe => {
                    Array(zalihe).forEach(zaliha => {
                        proizvodSaZalihom.proizvod_id = +p_id;
                        proizvodSaZalihom.naziv = zaliha["naziv_proizvoda"];
                        proizvodSaZalihom.slikaNaziv = zaliha["putanja"];
                        proizvodSaZalihom.opis = zaliha["opis"];
                        proizvodSaZalihom.tip_proizvoda_id = zaliha["tip_proizvoda_id"];
                        proizvodSaZalihom.naziv_tipa_proizvoda = zaliha["naziv_tipa_proizvoda"];
                        proizvodSaZalihom.cijena = zaliha["cijena"];
                    
                        let zalihaTemp: any = {};
                        zalihaTemp.zaliha_id = zaliha["zaliha_id"],
                        zalihaTemp.velicina_id = zaliha["velicina_id"],
                        zalihaTemp.naziv_velicine = zaliha["naziv_velicine"],
                        zalihaTemp.kolicina_zalihe = zaliha["kolicina_zalihe"],
                        zalihaTemp.cijena = zaliha["cijena"],
                        
                        proizvodSaZalihom.zalihe.push(zalihaTemp)
                    });
                })
            });

        console.log(proizvodSaZalihom);

        return proizvodSaZalihom;
                                                       
}



export default { postAddProduct, getDrzava, getGrad, putIzmjeneProizvoda, deleteProizvodId, getPorudzbine, getAllProizvodi, getlistaVelicine, getlistaTipovaProizvoda, getProizvodByID, getAllProizvodiSaTipom, getProizvodiSaZalihama }