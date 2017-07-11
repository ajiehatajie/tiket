import express from 'express';
const router = express.Router();

router.get('/',(req,res) =>
{
    res.render('auth/login');
    console.log('get from web routes /')
});

router.post('/admin/departemen',(req,res) =>{

})


export default router;