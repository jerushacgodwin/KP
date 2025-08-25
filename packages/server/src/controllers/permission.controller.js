
const {validationResult}=require('express-validator')
const userService=require('../services/user.services');

module.exports.Permission=async(req,res,next)=>{
    const error = validationResult(req);
  if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
     const {role}=req.body;
//Console.log(role,'role in permission controller')
       const userPermission= await userService.GetPermission(role)
             res.status(201).json({
      message: 'User created successfully',
 
      userpermission:userPermission
    
             })
            }