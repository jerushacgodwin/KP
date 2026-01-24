const finance=require('../services/finance.services')
module.exports.getfinance=async(req,res,next)=>{
        const result= await finance.getFinanceOfYear()
      res.status(201).json({
       data: result
     
      
    });
}
module.exports.getfinanceById=async(req,res,next)=>{
    const { id } = req.params;
    const result = await finance.getFinanceById(id);
    res.status(201).json({
        data: result
    });
}
module.exports.addfinance=async(req,res,next)=>{
    const { student_id, class_id, amount, status } = req.body;
    const result = await finance.addFinance({ student_id, class_id, amount, status });
    res.status(201).json({
        data: result
    });
} 
module.exports.getfeeTypes=async(req,res,next)=>{
    const result = await finance.getFeeTypes();
    res.status(201).json({
        data: result
    });
}
module.exports.addfee=async(req,res,next)=>{
    const { student_id, class_id, amount, status } = req.body;
    const result = await finance.addFee({ student_id, class_id, amount, status });
    res.status(201).json({
        data: result
    });
}
module.exports.getFeesByStudentId=async(req,res,next)=>{
   const studentId = req.params.id; 
   const schoolId = req.params.school_id;

    const result = await finance.getFeesByStudentId(studentId, schoolId);
    res.status(201).json({
        data: result
    });
}