import path from 'path';
import express from 'express';
import { Request, Response } from 'express';
import { request } from 'http';
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (request: any, file: any, callback: any) => {
        callback( null, path.join(__dirname, './../../public'));
    },
    filename: (request: any,file: any,  callback: any) => {
        callback( null, `${file.originalname}`);
    }
})

const multerFileUpload = multer({storage});

const fileUploadRouter = express.Router();

fileUploadRouter.post('/upload',
                    multerFileUpload.single('img'),
                    (request: any, response: Response) => {
                        response.send({
                            filename: request.file.filename
                        })
                    })

export default fileUploadRouter;