const express=require('express')
const router=express.Router();
const financeController=require('../controllers/finance.controller')
router.get('/',financeController.getfinance)
module.exports=router