import { Router } from 'express'; 
import proizvodController from './../controllers/proizvod-controller';

const router: Router = Router(); 

router.route('/proizvodi')
        .get(proizvodController.getAllProizvodi)
    
router.route('/proizvodiSaTipom')
        .get(proizvodController.getAllProizvodiSaTipom)
    
router.route('/proizvodi/:pid')
        .get(proizvodController.getProizvodByID)

 router.route('/proizvodiSaZalihama/:pid') // ovjde imas parametar
        .get(proizvodController.getProizvodiSaZalihama) 

 router.route('/listatipovaProizvoda')   
        .get(proizvodController.getlistaTipovaProizvoda)

 router.route('/listaVelicine')   
        .get(proizvodController.getlistaVelicine)

router.route('/sacuvajPromjene')
        .put(proizvodController.putIzmjeneProizvoda)

router.route('/addProduct')
        .post(proizvodController.postAddProduct)

router.route('/porudzbine')
        .get(proizvodController.getPorudzbine)

router.route('/proizvodId/:pid')   // ovjde nemas parametar, sad smo ga dodali.
        .delete(proizvodController.deleteProizvodId)

 router.route('/drzava')   
        .get(proizvodController.getDrzava)

 router.route('/grad/:drzava_id')   
        .get(proizvodController.getGrad)

export default router;
