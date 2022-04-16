import { ConnectionOptions } from "typeorm";

const dbConfig: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost', 
    port: 3308, 
    username: 'root', 
    password: '', 
    database: 'gazdinstvo_scekic'
};

export default dbConfig;