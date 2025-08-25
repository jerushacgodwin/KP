const userModel=require('../models/user.model')
const appMetas=require('../models/app_metas.model')
const roleModel=require('../models/user.role.model')
const permissionModel=require('../models/permission.model')
const Student = require("../models/student.model");
const Staff = require("../models/staff.model");
const crypto = require('crypto');
module.exports.createUser=async({userName,email,password})=>{
    try { if(!userName|| !email||!password){
        throw new Error('All field Required')
    }
     const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user=userModel.create({
        userName,email,password
    })
    return user
      
}catch (error) {
    console.error('Register error:', error);
      throw new Error('Internal server error');
    //res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports.loginUser=async({email,password})=>{
    try { 
        if( !email||!password){
        throw new Error('All field Required')
    }
  
   userModel.hasOne(roleModel, { foreignKey: 'user_id' });
     const selectUser = await userModel.findOne({ where: { email },  include: [{
    model: roleModel,
    attributes: ['role_id','user_id',], 
  }] });
 // console.log('selectUser',selectUser)
     const md5Hash = crypto.createHash('md5').update(password).digest('hex');
    if (selectUser.password!==md5Hash) {
      throw new Error('Check Email OR Password');
    }
///console.log('............',selectUser)
  return selectUser
      
}catch (error) {
    console.error('Register error:', error);
      throw new Error('Internal server error');
    //res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports.GetPermission=async(role)=>{
    try {
        //console.log('role',role) 
        if( !role){
        throw new Error('All field Required')
    }
    //console.log('role',role)
   //userModel.hasOne(roleModel, { foreignKey: 'user_id' });
     const userPermission = await permissionModel.findAll({ where: { group_id:role } });
  

//console.log('............',selectUser)
  return userPermission
      
}catch (error) {
    console.error('Register error:', error);
      throw new Error('Internal server error');
    //res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports.getUserProfile=async(user)=>{
 
    try { 
        if(!user){
        throw new Error('All field Required')
    }
     let selectUser
    if(user.role===3){
       selectUser = await Student.findOne({ where: { user_id:user.user_id }});
    }
    else {
       selectUser = await Staff.findOne({ where: { user_id:user.user_id }});
    }
    if (!selectUser) {
      throw new Error('User not found');
    }

 

     return selectUser;
    //console.log('user',user)
  } catch (error) {
    console.error('Get user profile error:', error);
    throw new Error('Internal server error');
  }
}
module.exports.createSchool = async (schoolData,file) => {
  //console.log('schoolData', file)
  try {
    if (!schoolData.schoolName || !schoolData.address ) {
      throw new Error('All fields are required');
    }
    const existing = await appMetas.findOne({ where: { meta_key: 'institute_settings' } });
     if (existing) {
      //console.log(file.img[0], 'file')
       await appMetas.update(
      {
        meta_key: 'institute_settings',

        meta_value: JSON.stringify({
          logo: file.img ? file.img[0].filename : "logo.png",
          school_name: schoolData.schoolName,
          address: schoolData.address,
        }),
        updated_at: new Date(),
        updated_by: 1,
        created_by: 1,
        created_at: new Date(),
      },
      { where: { meta_key: 'institute_settings' } }
    );
    return await appMetas.findOne({ where: { meta_key: 'institute_settings' } });
  } else {
    const createdSchool = await appMetas.instituteForm(schoolData, file);
    const newSchool = await appMetas.create(createdSchool);   
    return newSchool;
     }
  } catch (error) {
    console.error('Error creating school:', error);
    throw new Error('Internal server error');
  }
};
