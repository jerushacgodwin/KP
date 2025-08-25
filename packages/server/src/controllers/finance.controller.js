const finance=require('../services/finance.services')
module.exports.getfinance=async(req,res,next)=>{
        const result= await finance.getFinanceOfYear()
      res.status(201).json({
       data: result
     
      
    });
}