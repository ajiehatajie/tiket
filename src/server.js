import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import path from 'path';
import mysql from 'mysql';
import connection from 'express-myconnection';
//import db from './config/db';

//import file routes

import index from './routes';
import admin_dept from './routes/admin/departemen';
import config from './config/config';

//end import file

const app = express();
var engine = require('ejs-layout');
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/'));
app.engine('ejs', engine.__express);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares!
app.use(bodyParser.json())
app.use(
    connection(mysql,{
        host: '127.0.0.1',
        user: 'root', // your mysql user
        password : '', // your mysql password
        port : 3306, //port mysql
        database:'ticketing' // your database name
    },'pool') //or single

);



app.use('/',index);
app.use('/admin/departemen',admin_dept);

app.listen(config.port)
console.log(' Apps listen port -> '+config.webhost)
