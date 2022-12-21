import { Request, Response } from 'express';
import { ProizvodSaZalihom } from '../models/proizvod-sa-zalihom.model';
import proizvodRepository from './../repositories/proizvod-repository';

// ORM - Object Relational Mapper

const getAllProizvodi = async (request: Request, response:Response) => {
    proizvodRepository.getAllProizvodi()
        .then(data => {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send(err);
        })
}
const getAllProizvodiSaTipom = async (request: Request, response:Response) => {
    proizvodRepository.getAllProizvodiSaTipom()
        .then(data => {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send(err);
        })
}

const getProizvodByID = async (request: Request, response: Response) => {
    proizvodRepository.getProizvodByID(parseInt(request.params.pid))
        .then(data => {
            response.send(data[0]);
        }) 
        .catch(err => {
            response.status(500).send(err);
        })
}

const getProizvodiSaZalihama = async (request: Request, response:Response) => {
   await proizvodRepository.getProizvodiSaZalihama(parseInt(request.params.pid))
        .then(data => {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send(err);
        }) 
}


const getlistaTipovaProizvoda = async (request: Request, response:Response) => {
    await proizvodRepository.getlistaTipovaProizvoda()
         .then(data => {
             response.send(data);
         })
         .catch(err => {
             response.status(500).send(err);
         }) 
 }

 const getlistaVelicine = async (request: Request, response:Response) => {
    await proizvodRepository.getlistaVelicine(parseInt(request.params.pid))
         .then(data => {
             response.send(data);
         })
         .catch(err => {
             response.status(500).send(err);
         }) 
 }
 async function putIzmjeneProizvoda(request: Request, response: Response) {
    await proizvodRepository.putIzmjeneProizvoda(request.body)
        .then(data => {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send(err);
        });

}
        
const postAddProduct = async (request: Request, response:Response) => {
    await proizvodRepository.postAddProduct(request.body)
         .then(data => {
             response.send(data);
         })
         .catch(err => {
             response.status(500).send(err);
         })
        }

const getPorudzbine = async (request: Request, response:Response) => {
    await proizvodRepository.getPorudzbine()
             .then(data => {
                 response.send(data);
                 })
         .catch(err => {
             response.status(500).send(err);
                 })        
}

const getDrzava = async (request: Request, response:Response) => {
    await proizvodRepository.getDrzava()
             .then(data => {
                 response.send(data);
                 })
         .catch(err => {
             response.status(500).send(err);
                 })        
}

const deleteProizvodId = async (request: Request, response:Response) => {
    console.log(request.params)
     proizvodRepository.deleteProizvodId(parseInt(request.params.pid))
             .then(data => {
                 response.send(data);
                 })
         .catch(err => {
             response.status(500).send(err);
                 })        
}

const getGrad = async (request: Request, response:Response) => {
    await proizvodRepository.getGrad(parseInt(request.params.drzava_id))
             .then(data => {
                 response.send(data);
                 })
         .catch(err => {
             response.status(500).send(err);
                 })        
}



         

export default {postAddProduct, deleteProizvodId, getDrzava, getGrad, getPorudzbine, putIzmjeneProizvoda, getAllProizvodi, getlistaVelicine,getlistaTipovaProizvoda, getProizvodByID, getAllProizvodiSaTipom, getProizvodiSaZalihama }


