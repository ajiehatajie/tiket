import express from 'express';
const router = express.Router();

router.get('/',(req,res) =>
{
    res.render('auth/login');
    console.log('get from web routes /')
});


export default router;