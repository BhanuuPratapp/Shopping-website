const path = require('path');

var cors = require('cors')

const express = require('express');

const bodyParser = require('body-parser');



const errorController = require('./controllers/error');

const sequelize = require('./util/database');

const app = express();
app.use(cors())

app.use(express.json())
//app.use(express.urlencoded())
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user')
const expenseusers = require('./routes/forusers')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/user',userRoutes )
app.use('/user',expenseusers)
//app.use(errorController.get404);

/*

app.post('/user/add-user', async (req, res, next) =>{
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
})


app.get('/user/get-user', async(req, res, next) =>{
  try{
  const users = await User.findAll();
  res.status(200).json({allUsers: users})
  }
  catch(err){
    console.log('GetUser is failing ', JSON.stringify(err))
    res.status(500).json({error: err})
  }
})

app.delete('/user/delete-user/:id', async(req, res, next) =>{
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
})
*/

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
