import express from 'express';
import util from 'util';
const router = express.Router();

router.get('/',(req,res) =>
{
	req.getConnection((err,conn) => {
    	
    	 if (err) return next("Cannot Connect");

    	   var query = conn.query('SELECT * FROM kategori',(err,rows) => 
    	   {

            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('admin/kategori/index',{data:rows});
    		console.log('get from admin kategori index ')


          });

    });
    
   
});

router.get('/add',(req,res) =>
{
    res.render('admin/kategori/add');
    console.log('get from admin kategori index ')
});



router.post('/',(req,res) => {

	req.checkBody('nama', 'Nama Is Empty').notEmpty();
	
  	req.getValidationResult().then( (result) => {
  
    if (!result.isEmpty()) {
      res.status(400).json('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    	 
    	var data = {
	        nama:req.body.nama,
	        
	     };

    	 req.getConnection((err,conn) => {
    	 
    	 if (err) return next("Cannot Connect");

    	 	var query = conn.query("INSERT INTO kategori set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          	//res.sendStatus(200);
          	 res.redirect('/admin/kategori');

        	});

    	 });



 	 });

	
	console.log(req.body);

})

router.get('/show/:id',(req,res) =>
{
    res.render('admin/kategori/show');
    console.log('get from admin kategori index ')
});

router.get('/:id/edit',(req,res) =>
{
	 var id = req.params.id;

    req.getConnection((err,conn) => {
    	
    	 if (err) return next("Cannot Connect");

    	   var query = conn.query('SELECT * FROM kategori where id= ?',[id],(err,rows) => 
    	   {

            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('admin/kategori/edit',{data:rows});
    		console.log('get from admin kategori index '+rows);


          });

    });
    

});
router.post('/edit/:id',(req,res) =>
{
	 var id = req.params.id; 
    var input = JSON.parse(JSON.stringify(req.body));

	   var data = {
            
            nama    : input.nama
            
        
        };

    req.getConnection((err,conn) => {
    	
    	 if (err) return next("Cannot Connect");

    	   var query = conn.query('update kategori set ? where id = ?',[data,id],(err,rows) => 
    	   {

            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.redirect('/admin/kategori');
    		console.log('get from admin kategori index '+rows);


          });

    });
    

});


router.get('/delete/:id',(req,res) =>
{
	 var id = req.params.id;
   req.getConnection((err,conn) => {
    	
    	 if (err) return next("Cannot Connect");

    	   var query = conn.query('delete from kategori where id = ?',[id],(err,rows) => 
    	   {

            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.redirect('/admin/kategori');
    		console.log('get from admin kategori index '+rows);


          });

    });

});


export default router;