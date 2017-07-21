import express from 'express';
import util from 'util';
const router = express.Router();
import mysql from 'mysql';

const conn = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root', // your mysql user
        password : '', // your mysql password
        port : 3306, //port mysql
        database:'ticketing' // your database name
    },'pool') //or single

router.get('/',(req,res) =>
{
	var id = req.params.id;

	req.getConnection((err,conn) => {
    	
    	 if (err) return next("Cannot Connect");

    	   var query = conn.query('SELECT * FROM tiket where user_id= ?',[id],(err,rows) => 
    	   {

            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('user/index',{data:rows});
    		console.log('get from user page index ')


          });

    });
    
   
});


router.get('/add',(req,res) =>
{
	req.getConnection((err,conn) => {
    	
    	 if (err) return next("Cannot Connect");

    	   var query = conn.query('SELECT * FROM kategori order by id desc',(err,rows) => 
    	   {

            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(rows);
            
            getDepartemen( (result) => 
            {
            	var drinks = [
			        { name: 'Bloody Mary', drunkness: 3 },
			        { name: 'Martini', drunkness: 5 },
			        { name: 'Scotch', drunkness: 10 }
			    ];

            res.render('user/add',{data:rows,kategori:drinks,departemen:result });
    		console.log('get from user page add ');

            });

           
          
    

          });

    });
   
});


function getDepartemen (callback) 
{
    conn.query('SELECT * FROM departemen', (err,rows) => 
    {
	  	  if(err) throw err;
		  //console.log('Data received from Db:\n');
		  //console.log(rows);
		  callback(rows);
	});

}



export default router;