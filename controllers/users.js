
const User = require('../models/user');

exports.postAddUser =  async (req, res, next) =>{
  try{
   const name  = req.body.name;
  
   const email = req.body.email;
 
   if(!req.body.email){
     throw new Error("Email is mandatory");
   }
   const data = await User.create( {name:name, email:email} )
  
   
   res.status(201).json({newUserDetail: data});
  }
  catch(err){
   res.status(500).json({
     error: err
   })
  }
 }

 
 exports.getUser =  async(req, res, next) =>{
  try{
  const users = await User.findAll();
  res.status(200).json({allUsers: users})
  }
  catch(err){
    console.log('GetUser is failing ', JSON.stringify(err))
    res.status(500).json({error: err})
  }
}

exports.deleteUser = async(req, res, next) =>{
  try{
    if(req.params.id == 'undefined'){
      console.log('Id is missing')
      res.status(400).json({err: 'Id is missing'})
    }
    const uid = req.params.id;
    await User.destroy({where: {id: uid}});
    res.status(200);
  }
  catch(err){
    res.status(200).json({error: err})
  }
  }