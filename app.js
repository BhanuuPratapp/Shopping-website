const path = require('path');

var cors = require('cors')

const express = require('express');

const bodyParser = require('body-parser');



const errorController = require('./controllers/error');

const sequelize = require('./util/database');

const products = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItems = require('./models/cart-items')
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

app.use((req, res, next) => {
  console.log("bhanuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
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


products.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(products);
User.hasOne(Cart)
Cart.belongsTo(User);
Cart.belongsToMany(products, {through: CartItems});
products.belongsToMany(Cart, {through: CartItems});


sequelize
  .sync()
  .then(result => {
    return User.findByPk(1);
   
  })
  .then(user =>{
    if(!user){   return User.create({name: 'Bhanu', email:'pratapbhanuuu@gmail.com'});
  }
  return user;
  })
  .then(user =>{
   return user.createCart();
  })
  .then(cart =>{
    app.listen(3000)
  })
 
  .catch(err => {
    console.log(err);
  });
