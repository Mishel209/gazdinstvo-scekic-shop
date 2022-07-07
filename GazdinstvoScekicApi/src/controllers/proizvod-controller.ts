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
 const putIzmjeneProizvoda = async (request: Request, response:Response) => {
    await proizvodRepository.putIzmjeneProizvoda(request.body)
         .then(data => {
             response.send(data);
         })
         .catch(err => {
             response.status(500).send(err);
         }) 
 
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
         

export default {postAddProduct, putIzmjeneProizvoda, getAllProizvodi, getlistaVelicine,getlistaTipovaProizvoda, getProizvodByID, getAllProizvodiSaTipom, getProizvodiSaZalihama }