var db = require('../models/db2.js');

exports.bid = function(req,res){
	if(!req.session.user || req.session.user.buyActivate== 0){
		res.redirect('/');
	}
	if(req.body.quantity == 0 ){
		res.send('SOld OUT Already');
	}
	else {
	var bid = "INSERT INTO Bid SET ? ";
	var time =  new Date().toISOString().slice(0, 19).replace('T', ' ');
	var value = {Bid_product_id:req.session.product.Product_id, Bid_customer_id:req.session.user.Customer_id, Bid_price: req.body.myprice, Bid_time: time};
	db.getConnection(function(err,connection){
		connection.query(bid, value, function(err, result){
			if(err)
				res.redirect('/');
			else{
				req.session.product= null;
				res.send('bid is accepted!');
				connection.release();
			}
		});
	});
	}
}