var ejs = require('ejs');
var db = require('../models/db.js');
var db2 = require('../models/db2.js');


exports.sell = function(req, res) {
	if(!req.session.user){
		res.redirect('/');
	}
	res.render('sell', {
		title : 'Sell A Thing',
		user: req.session.user
	});
}

exports.afterSell = function(req,res) {
	if(!req.session.user){
		res.redirect('/');
	}
	else {
	var name = req.body.Product_name;
	var quantity = req.body.Product_quantity;
	var info = req.body.Product_info;
	var category = req.body.Product_category;
	var condition = req.body.Product_condition;
	var type = 0;
	var price= req.body.Product_price;
    var seller = req.session.user.Seller_id;
    var image = req.body.Product_url;
    
    var sell = "INSERT INTO Product SET ?";
    var value = {Product_name: name, Product_category_id:category, Product_price: price, Product_condition: condition, Product_type: type,
    		     Product_seller_id:seller, Product_info:info, Product_quantity: quantity, Product_img: image};
    db2.getConnection(function(err,connection){
		connection.query(sell, value, function(err, result){
			if(err)
				throw err;
			else{
				res.redirect('/toHomepage');
				connection.release();
			}
		});
	});
	}
}

exports.afterAuctionSell = function(req, res) {
	if(!req.session.user){
		res.redirect('/');
	}
	else {
		var name = req.body.Product_name;
		var quantity = 1;
		var info = req.body.Product_info;
		var category = req.body.Product_category;
		var condition = req.body.Product_condition;
		var type = 1;
		var end = new Date();
		var endtime =new Date(end.valueOf() + 3*60*1000);//1*24*60*60*1000);
		if(req.body.Product_list_time == 2){
			endtime = new Date(end.valueOf() + 3*24*60*60*1000);
		}
		var starttime = new Date();
		var image = req.body.Product_url;
	//	var bprice = req.body.Product_buy_price;
		var aprice = req.body.Product_start_price;
	    var seller = req.session.user.Seller_id;
	    var sell = "INSERT INTO Product SET ?";
	    var value = {Product_name: name, Product_category_id:category, /*Product_price: bprice,*/ Product_condition: condition, Product_type: type,
	    		     Product_seller_id:seller, Product_info:info, Product_quantity: quantity, Product_bid_start_price:aprice, Product_bid_end_time:
	    		    	 endtime, Product_bid_start_time: starttime, Product_bid_end: 0, Product_img: image};
	    console.log(value);
	    db2.getConnection(function(err,connection){
			connection.query(sell, value, function(err, result){
				if(err)
					throw err;
				else{
					res.redirect('/toHomepage');
					connection.release();
				}
			});
		});
		}
	}
function getCategory(callback) {
	var show = "select * from Category";
	console.log("Query is: " + show);
	db.fetchData(function(err, result) {
		if (err)
			throw err;
		else {
			callback(result);
		}
	}, show);
}

exports.list = function(req,res){
	console.log("in list");
	var cid = req.params.cid;
	var query = "select * from Product where Product_category_id = "+cid;
	console.log("Query is: " + query);
	db.fetchData(function(err, result){
		if(err)
			throw err;
		else{
			console.log(result);
			//console.log(JSON.stringify(result));
			res.send(result);	
		}
	}, query);
}

exports.toSell = function(req, res) {
	var session = req.session;
	console.log(JSON.stringify(session));
	
	var getUser = "SELECT * FROM Person, Seller WHERE Person.Person_id = Seller.Person_id AND Person.Person_id = "+ req.session.user.Person_id;

	console.log("Query is: " + getUser);
	db.fetchData(function(err, result) {
//		if (err){
//			throw err;
//		}
//		else {
//			console.log("result = "+ JSON.stringify(result));
//			if (result.length > 0) {		
				req.session.user = result[0];
				console.log(req.session.user);
				getCategory(function(result) {
					res.render('sellPage', {
						title : 'Ebay',
						show : result
					});
				});				
//				
//			}else {
//				console.log("invalid login");
//				ejs.renderFile('./views/failSignIn.ejs', function(err,
//						result) {
//					if (!err) {
//						res.end(result);
//					} else {
//						res.end('An error occurred');
//						console.log(err);
//					}
//				});
//			}
//		}
	}, getUser);
}

exports.toHomepage = function(req, res) {
	getCategory(function(result) {
		res.render('homepage', {
			title : 'Ebay',
			show : result
		});
	});
}