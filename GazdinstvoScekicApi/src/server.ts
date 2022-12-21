import express from 'express';
import { Application } from 'express';
import { createConnection } from 'typeorm';
import cors, {CorsOptions} from 'cors';
import dbConfig from './common/db-config';
import fileUploadRouter from './common/file-upload';

// import routera 
import proizvodRouter from './routing/proizvod-routing';
import path from 'path';

const app: Application = express(); 
app.use(express.json());

const corsOption: CorsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOption));

app.use(proizvodRouter);
app.use(fileUploadRouter);
app.use(express.static(path.join(__dirname, './../public')));

createConnection(dbConfig)
  .then(connection => {
    console.log("Connected to DB!");
  })
  .catch(err => {
    console.log("Error while connecting to DB");
    console.log(err);
  })

const listener: any = app.listen(3000, () => {
  console.log('Server is listening at port 3000'); 
  console.log(listener.address().port) ; 
})

