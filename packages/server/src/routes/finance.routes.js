const express=require('express')
const router=express.Router();
const financeController=require('../controllers/finance.controller')
//router.get('/',financeController.getfinance)
router.get('/getfeesById/:id',financeController.getfinanceById)
router.post('/addfees',financeController.addfinance)
router.get('/getfeecategories',financeController.getfeeTypes)
router.post('/addfee',financeController.addfee)
router.get('/getFeesByStudentId/:id/:school_id', financeController.getFeesByStudentId); 
module.exports=router