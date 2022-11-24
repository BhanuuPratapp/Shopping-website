const Product = require('../models/product');
const Cart = require('../models/cart');
const ITEMS_PER_PAGE = 3;


exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;

  let totalItems;

  Product.count()
  .then((total) =>{
    totalItems = total;
     return Product.findAll(
      {
      offset:((page-1)*ITEMS_PER_PAGE),
      limit : ITEMS_PER_PAGE,
      }
    )
  })
  .then(products =>{

    res.json({products,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
       success: true })
  /*  res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
    */
  }).catch(err => console.log(err))

};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId).then(product =>{
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  }).catch(err =>{
    console.log(err)
  })
};


exports.getIndex = (req, res, next) => {

  const page = +req.query.page || 1;
 
  Product.findAll(
  {
      offset:((page-1)*ITEMS_PER_PAGE),
      limit : ITEMS_PER_PAGE,
    
    }
  )
  
  
  .then(products =>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => console.log(err))
  
};


exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart=>{
    //console.log(cart)
    return cart.getProducts().then(products => {
      res.status(200).json({products: products, success: true})
      /*
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
      */
    }).catch(err => console.log(err))
  })
  .catch(err => console.log(err))
 /* Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
  */
};


exports.postCart = (req, res, next) => {
  console.log(req.body.productId)
  if(!req.body.productId){
    res.status(400).json({success: false, message: "ProductId is missing"})
  }
  const prodId = req.body.productId;
  let fetchedCart;
  let newquantity = 1;
   req.user.getCart().then(cart =>{
     fetchedCart = cart;
     
    return cart.getProducts({where :{id:prodId}})
   })
   .then(products =>{
    let product;

    if(products.length > 0 ){
      product = products[0]; 
    }
  
    if(product){
     const oldQuantity = product.cartItems.quantity;
     newquantity = oldQuantity + 1;
     return product;
    }
    return Product.findByPk(prodId)

   })
   .then(product =>{
    return fetchedCart.addProduct(product, {through:{quantity : newquantity}})

   })
   .then(() =>{
   // res.redirect('/cart')
   res.status(200).json({success: true, message:"Successfully added the product"})
   })
   .catch(err =>{ res.status(500).json({success: false, message:"Failing in adding the product"})
 } )
};

/*
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};
*/
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart().then(cart =>{
    return cart.getProducts({where:{id:prodId}})
  }).then(products =>{
    const product = products[0];
    return product.cartItems.destroy()
  }).then(result =>{
    //res.status(200).json({success: true ,message: "Successfully deleted the product"})
    res.redirect('/cart')
  })
  .catch(err =>console.log(err))


 /* Product.findByPk(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
  */
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
