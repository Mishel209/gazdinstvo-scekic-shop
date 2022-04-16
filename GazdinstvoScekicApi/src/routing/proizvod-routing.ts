import { Router } from 'express'; 
import proizvodController from './../controllers/proizvod-controller';

const router: Router = Router(); 

router.route('/proizvodi')
        .get(proizvodController.getAllProizvodi)
        
    
router.route('/proizvodi/:pid')
        .get(proizvodController.getProizvodByID)
        

export default router;
