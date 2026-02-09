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
     if (!selectUser) {
        throw new Error('User not found');
     }

     const bcrypt = require('bcryptjs');
     const md5Hash = crypto.createHash('md5').update(password).digest('hex');
     
     let isMatch = false;
     if (selectUser.password === md5Hash) {
       isMatch = true;
     } else if (selectUser.password.startsWith('$2y$') || selectUser.password.startsWith('$2a$') || selectUser.password.startsWith('$2b$')) {
       // Convert $2y$ to $2a$ for bcryptjs if needed, or just try as is
       const normalizedHash = selectUser.password.replace(/^\$2y\$/, '$2a$');
       isMatch = bcrypt.compareSync(password, normalizedHash);
     }

    if (!isMatch) {
      throw new Error('Check Email OR Password');
    }
///console.log('............',selectUser)
  return selectUser
      
}catch (error) {
    console.error('Login error:', error.message);
      throw error; // Re-throw the specific error instead of masking it
  }
}
module.exports.GetPermission=async(role)=>{
    try {
        if( !role){
        throw new Error('All field Required')
    }
    
   // For admin (role 1), return all permissions
   // For other roles, filter by group_id
     let userPermission;
     if (role == 1) {
       // Admin gets all permissions
       console.log('Fetching all permissions for Admin');
       userPermission = await permissionModel.findAll();
     } else {
       // Other roles get permissions filtered by their group_id
       console.log('Fetching permissions for group_id:', role);
       userPermission = await permissionModel.findAll({ where: { group_id: role } });
     }

  
  return userPermission
      
}catch (error) {
    console.error('GetPermission error:', error);
      throw new Error('Internal server error');
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
