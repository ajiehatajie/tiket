import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import path from 'path';
import mysql from 'mysql';
import connection from 'express-myconnection';
import engine from 'ejs-layout';
//import db from './config/db';

//import file routes

import index from './routes';
import admin_dept from './routes/admin/departemen';
import admin_kat  from './routes/admin/kategori';
import config from './config/config';


//user
import user_page from './routes/user/tiket'
//
//end import file

const app = express();

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
app.use('/admin/kategori',admin_kat);
app.use('/user',user_page);

app.listen(config.port)
console.log(' Apps listen port -> '+config.webhost)
