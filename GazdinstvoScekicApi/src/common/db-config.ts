import { ConnectionOptions } from "typeorm";

const dbConfig: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost', 
    port: 3306, 
    username: 'root', 
    password: '', 
    database: 'gazdinstvo_scekic_new'
};

export default dbConfig;