import { getManager } from "typeorm";
import _, { pick } from "lodash";


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
    return getManager().query(`SELECT * FROM proizvod WHERE pid = ? && naziv = ?`, [ pid ]);
}
const getProizvodiSaZalihama = async (proizvod_id: number) => {
                                  let  queryResult = await getManager().query(`SELECT 
                                  proizvod.id AS proizvod_id, 
                                  proizvod.naziv AS naziv_proizvoda, 
                                  proizvod.opis AS opis_proizvoda,
                                  zalihe.id AS zaliha_id, 
                                  zalihe.kolicina AS kolicina_zalihe,
                                  velicina.id AS velicina_id,
                                  velicina.naziv AS naziv_velicine, 
                                  tip_proizvoda.naziv AS naziv_tipa_proizvoda,
                                  tip_proizvoda.id AS tip_proizvoda_id 
                                 FROM proizvod 
                                 INNER JOIN zalihe ON zalihe.proizvod_id = proizvod.id
                                 INNER JOIN velicina ON velicina.id = zalihe.velicina_id
                                 INNER JOIN tip_proizvoda ON tip_proizvoda.id = proizvod.tip_proizvoda_id
                                 WHERE proizvod_id = ${proizvod_id}`);

        let zaliheFlat = JSON.parse(JSON.stringify(queryResult));
        let poljaZaGrupisanje = ['proizvod_id', 'naziv_proizvoda' ,'opis_proizvoda','naziv_tipa_proizvoda','tip_proizvoda_id'];
        
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
                        proizvodSaZalihom.tip_proizvoda_id = zaliha["tip_proizvoda_id"];
                        proizvodSaZalihom.naziv_tipa_proizvoda = zaliha["naziv_tipa_proizvoda"];
                    
                        let zalihaTemp: any = {};
                        zalihaTemp.zaliha_id = +zaliha["zaliha_id"],
                        zalihaTemp.velicina_id = zaliha["velicina_id"],
                        zalihaTemp.naziv_velicine = zaliha["naziv_velicine"],
                        zalihaTemp.kolicina_zalihe = zaliha["kolicina_zalihe"],
                        
                        proizvodSaZalihom.zalihe.push(zalihaTemp)
                    });
                })
            });

        console.log(proizvodSaZalihom);

        return proizvodSaZalihom;
                                                       
}



export default { getAllProizvodi, getProizvodByID, getAllProizvodiSaTipom, getProizvodiSaZalihama }