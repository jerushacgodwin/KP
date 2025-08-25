const events=require('../services/event.services')
const {validationResult,body}=require('express-validator')
module.exports.getEvents=async(req,res,next)=>{
     
     const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

    const { email } = req.body || {};  
    const result= await events.getEventList(email || null);
    res.status(200).json({
      message: 'Event fetched successfully',
      events: result,
    });
  
  
}