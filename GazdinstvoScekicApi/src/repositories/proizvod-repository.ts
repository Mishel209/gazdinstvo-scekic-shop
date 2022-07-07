import { getManager } from "typeorm";
import _, { pick } from "lodash";
import { ProizvodSaZalihom } from "../models/proizvod-sa-zalihom.model";


const getAllProizvodi = () => {

    return getManager().query(`SELECT * FROM proizvod`);
}
const getAllProizvodiSaTipom = () => {
    return getManager().query(`SELECT 
                                proizvod.id,
                                proizvod.naziv, 
                                proizvod.opis, 
                                cjenovnik.cijena,
                                tip_proizvoda.naziv AS nazivTipaProizvoda  
                                FROM proizvod 
                                INNER JOIN tip_proizvoda ON proizvod.tip_proizvoda_id = tip_proizvoda.id
                                INNER JOIN cjenovnik ON proizvod.id = cjenovnik.proizvod_id`);
}
const getProizvodByID = (pid: number) => {
    return getManager().query(`SELECT * FROM proizvod WHERE pid = ? && naziv = ?`, [ pid ]);
}
const getlistaTipovaProizvoda = () => {
    return getManager().query(`SELECT * FROM tip_proizvoda`);
}

function getlistaVelicine(pid: number) {
    return getManager().query(`SELECT * FROM velicina`);
}

async function postAddProduct(proizvod: ProizvodSaZalihom) {
    console.log(proizvod);
    let insertProizvodResult = await getManager().query(`INSERT INTO proizvod 
    ( naziv, opis, tip_proizvoda_id, cijena)
    VALUES  ("${proizvod.naziv}",
            "${proizvod.opis}",
            "${proizvod.cijena}",
            "${proizvod.tip_proizvoda_id}")`)
     
     proizvod.zalihe.forEach(async (zaliha) => {
        await getManager().query(`INSERT INTO zalihe
        (kolicina, velicina_id, proizvod_id, cijena)
      VALUES ("${zaliha.kolicina_zalihe}",
            "${zaliha.velicina_id}",
            "${insertProizvodResult["insertId"]}",
            "${zaliha.cijena}")`);
    });

    proizvod.zalihe.forEach(async (cjenovnik) => {
        await getManager().query(`INSERT INTO cjenovnik
        (datum_od, datum_do, cijena, popust, velicina_id, proizvod_id)
      VALUES ("${cjenovnik.datum_od}",
            "${cjenovnik.datum_do}",
            "${cjenovnik.cijena}",
            "${cjenovnik.popust}",
            "${cjenovnik.velicina_id},
            "${cjenovnik.proizvod_id}")`);
    });
    return true;
}

async function putIzmjeneProizvoda(proizvod: ProizvodSaZalihom) {
    console.log(proizvod);
    let queryResult = await getManager().query(`UPDATE proizvod
    SET naziv = "${proizvod.naziv}",
     opis = "${proizvod.opis}",
      tip_proizvoda_id = ${proizvod.tip_proizvoda_id}
    WHERE id = ${proizvod.proizvod_id}`);

    proizvod.zalihe.forEach(async (zaliha) => {
        await getManager().query(`UPDATE zalihe
        SET 
        kolicina = ${zaliha.kolicina_zalihe}
        WHERE id = ${zaliha.zaliha_id}`);
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
                        proizvodSaZalihom.opis = zaliha["opis"];
                        proizvodSaZalihom.tip_proizvoda_id = zaliha["tip_proizvoda_id"];
                        proizvodSaZalihom.naziv_tipa_proizvoda = zaliha["naziv_tipa_proizvoda"];
                        proizvodSaZalihom.cijena = zaliha["cijena"];
                    
                        let zalihaTemp: any = {};
                        zalihaTemp.zaliha_id = +zaliha["zaliha_id"],
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



export default { postAddProduct, putIzmjeneProizvoda, getAllProizvodi, getlistaVelicine, getlistaTipovaProizvoda, getProizvodByID, getAllProizvodiSaTipom, getProizvodiSaZalihama }