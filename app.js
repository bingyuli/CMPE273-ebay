
/**
 * Module dependencies.
 */

var express = require('express')
  , session = require('express-session')
  , routes = require('./routes')
  //, user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var home = require('./routes/home')
  , admin = require('./routes/admin')
  , signIn = require('./routes/signIn')
  , signUp = require('./routes/signUp')
  , index = require('./routes/index')
  , user = require('./routes/user')
  , activate = require('./routes/activate')
  , category = require('./routes/category')
  , shoppingcart = require('./routes/shoppingcart')
  , product = require('./routes/product')
  , trans = require('./routes/trans')
  , search = require('./routes/search') //new added
  , searchPerson = require('./routes/searchPerson')    // new added
  , sell = require('./routes/sell')    // new added
  , bid = require('./routes/bid')    // new added
  , editPerson = require('./routes/editPerson')
  , searchPerson = require('./routes/searchPerson')
  , editProduct = require('./routes/editProduct')
  ;     
  //addToCart = require('./routes/addToCart');

var app = express();

app.use(session({secret: 'keyboard cat'}));
app.use(function(req, res, next){ 
	res.locals.session = req.session; 
	next(); 
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/signUp', signUp.signUp);
app.post('/afterSignUp', signUp.afterSignUp);
app.get('/signIn', signIn.signIn);
app.get('/afterSignIn', signIn.afterSignIn);
app.get('/signIn_admin', admin.signIn_admin);
app.get('/afterSignIn_admin', admin.afterSignIn_admin);
app.get('/signOut_admin', admin.signOut_admin);
app.get('/listPerson', admin.listPerson);
app.get('/listCustomers', admin.listCustomers);
app.get('/listSellers', admin.listSellers);
app.get('/toAdminHome', admin.toAdminHome);
app.post('/toDeleteC', admin.toDeleteC);
app.post('/deactivateC/:cid', admin.deactivateC);
app.post('/toDeleteS', admin.toDeleteS);
app.post('/deactivateS/:sid', admin.deactivateS);
app.post('/toDeleteP', admin.toDeleteP);
app.post('/deleteP/:pid', admin.deleteP);
app.get('/myAccount', user.showUser);
app.get('/buyHistory', user.showBuyHistory);
app.get('/sellHistory', user.showSellHistory);
app.get('/list/:cid', signIn.list);
app.post('/bdeactivate', activate.bdeactivate);
app.post('/bactivate', activate.bactivate);
app.post('/sdeactivate', activate.sdeactivate);
app.post('/sactivate', activate.sactivate);
app.get('/signOut', index.signOut);
app.get('/toHomepage', signIn.toHomepage);
app.get('/bidHistory', user.showBidHistory);

app.get('/toshoppingcart', shoppingcart.toshoppingcart);
app.post('/checkout', shoppingcart.checkout);
app.get('/payment', shoppingcart.payment);
//app.get('/productDetail/:proid', product.productDetail);

app.get('/toEditEmail', editPerson.toEditEmail);
app.post('/editEmail', editPerson.editEmail);
app.get('/toEditPassword', editPerson.toEditPassword);
app.post('/editPassword', editPerson.editPassword);
app.get('/toEditNameAddress', editPerson.toEditNameAddress);
app.post('/editNameAddress', editPerson.editNameAddress);
app.get('/toEditProduct', editProduct.toEditProduct);
app.post('/editProduct', editProduct.editProduct);

app.get('/show/:id', trans.show);
app.post('/rate',trans.rate);
app.get('/user/:id', user.show);

//new added
app.get('/toListProduct', admin.toListProduct);
app.get('/listAuctions', admin.listAuctions);
app.post('/searchProduct', search.searchProduct);


app.get('/toProduct/:pid', product.showProduct);
app.get('/toSell', sell.toSell);
app.post('/afterSell', sell.afterSell);
app.post('/afterAuctionSell', sell.afterAuctionSell);
app.post('/toShoppingCart', shoppingcart.addToCart);
app.post('/Product/bid/:id', bid.bid);
app.get('/searchPerson', searchPerson.searchUser);
app.get('/afterSearchUser', searchPerson.afterSearchUser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
