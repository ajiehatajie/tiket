import express from 'express';
import util from 'util';
const router = express.Router();

router.get('/',(req,res) =>
{
	req.getConnection((err,conn) => {
    	
    	 if (err) return next("Cannot Connect");

    	   var query = conn.query('SELECT * FROM departemen',(err,rows) => 
    	   {

            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('admin/departemen/index',{data:rows});
    		console.log('get from admin departemen index ')


          });

    });
    
   
});

router.get('/add',(req,res) =>
{
    res.render('admin/departemen/add');
    console.log('get from admin departemen index ')
});



router.post('/',(req,res) => {

	req.checkBody('name', 'Name Is Empty').notEmpty();
	
  	req.getValidationResult().then( (result) => {
  
    if (!result.isEmpty()) {
      res.status(400).json('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    	 
    	var data = {
	        name:req.body.name,
	        desc:req.body.desc
	     };

    	 req.getConnection((err,conn) => {
    	 
    	 if (err) return next("Cannot Connect");

    	 	var query = conn.query("INSERT INTO departemen set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          	//res.sendStatus(200);
          	 res.redirect('/admin/departemen');

        	});

    	 });



 	 });

	
	console.log(req.body);

})

router.get('/show/:id',(req,res) =>
{
    res.render('admin/departemen/show');
    console.log('get from admin departemen index ')
});

router.get('/:id/edit',(req,res) =>
{
	 var id = req.params.id;

    req.getConnection((err,conn) => {
    	
    	 if (err) return next("Cannot Connect");

    	   var query = conn.query('SELECT * FROM departemen where id= ?',[id],(err,rows) => 
    	   {

            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('admin/departemen/edit',{data:rows});
    		console.log('get from admin departemen index '+rows);


          });

    });
    

});
router.post('/edit/:id',(req,res) =>
{
	 var id = req.params.id; 
    var input = JSON.parse(JSON.stringify(req.body));

	   var data = {
            
            name    : input.name,
            desc 	: input.desc
            
        
        };

    req.getConnection((err,conn) => {
    	
    	 if (err) return next("Cannot Connect");

    	   var query = conn.query('update departemen set ? where id = ?',[data,id],(err,rows) => 
    	   {

            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.redirect('/admin/departemen');
    		console.log('get from admin departemen index '+rows);


          });

    });
    

});


router.get('/delete/:id',(req,res) =>
{
	 var id = req.params.id;
   req.getConnection((err,conn) => {
    	
    	 if (err) return next("Cannot Connect");

    	   var query = conn.query('delete from departemen where id = ?',[id],(err,rows) => 
    	   {

            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.redirect('/admin/departemen');
    		console.log('get from admin departemen index '+rows);


          });

    });

});


export default router;