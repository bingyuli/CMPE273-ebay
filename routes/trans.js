var db = require('../models/db.js');

exports.show = function(req, res){
//	var trans = "SELECT buyer.Person_id as bid, buyer.Person_last_name as blname, buyer.Person_first_name as bfname, seller1.Person_id as sid,"+ 
//				"seller1.Person_last_name as slname, seller1.Person_first_name as sfname, TransHistory_id, TransHistory_Product_id, Product.Product_name,"+ 
//				"Product.Product_img, Product.Product_type, Product.Product_price, TransHistory_price, TransHistory_time, TransHistory_type, TransHistory_rate FROM mydb.TransHistory, mydb.Customer, mydb.Product, mydb.Seller, Person as buyer, Person as seller1 " +
//				"WHERE buyer.Person_id =Customer.Person_id AND seller1.Person_id= Seller.Seller_id AND TransHistory.TransHistory_Seller_id = Seller.Seller_id  " +
//				"AND TransHistory.TransHistory_Buyer_id = Customer.Customer_id AND TransHistory.TransHistory_Product_id = Product.Product_id  " +
//				"AND TransHistory.TransHistory_id ="+ req.params.id; //+ " AND buyer.Person_id = " + req.session.user.Person_id;
	var trans = "SELECT buyer.Person_id as bid, buyer.Person_last_name as blname, " +
			"buyer.Person_first_name as bfname,seller1.Person_id as sid, " +
			"seller1.Person_last_name as slname, seller1.Person_first_name as sfname, TransHistory_id, " +
			"TransHistory_Product_id, Product.Product_name, Product.Product_img, Product.Product_type, Product.Product_price, " +
			"TransHistory_price, TransHistory_time, TransHistory_type, TransHistory_rate " +
			"FROM TransHistory, Customer, Product, Seller, Person  as buyer , Person as seller1" +
			" WHERE buyer.Person_id = Customer.Person_id  " +
			"AND seller1.Person_id = Seller.Person_id  " +
			"AND TransHistory.TransHistory_seller_id = Product.Product_seller_id  " +
			"AND TransHistory.TransHistory_seller_id = Seller.Seller_id  " +
			"AND TransHistory.TransHistory_buyer_id = Customer.Customer_id  " +
			"AND TransHistory.TransHistory_Product_id = Product.Product_id  " +
			"AND TransHistory.TransHistory_id ="+ req.params.id;
	
	db.fetchData(function(err,result){
		
		console.log("rate::"+ JSON.stringify(result));
		if (err)
			//throw err;
			console.log("fetch data error ...");
		else{
            res.render('transactions', {
				                        title: 'Transaction Detail',
					                    user: req.session.user,   
					                    result: result,
					                    id: req.params.id
			                        });
		};	    
	},trans);
	

}

exports.rate = function(req, res){
	var rate= req.body.rate;
	var rate = "UPDATE TransHistory SET TransHistory_rate =  "+ rate + " WHERE TransHistory_id = " + req.body.id;
	db.updateData(function(err,result){
		if(err)
			throw err;
		else{
			var trans = "SELECT buyer.Person_id as bid, buyer.Person_last_name as blname, " +
			"buyer.Person_first_name as bfname,seller1.Person_id as sid, " +
			"seller1.Person_last_name as slname, seller1.Person_first_name as sfname, TransHistory_id, " +
			"TransHistory_Product_id, Product.Product_name, Product.Product_img, Product.Product_type, Product.Product_price, " +
			"TransHistory_price, TransHistory_time, TransHistory_type, TransHistory_rate " +
			"FROM TransHistory, Customer, Product, Seller, Person  as buyer , Person as seller1" +
			" WHERE buyer.Person_id = Customer.Person_id  " +
			"AND seller1.Person_id = Seller.Person_id  " +
			"AND TransHistory.TransHistory_seller_id = Product.Product_seller_id  " +
			"AND TransHistory.TransHistory_seller_id = Seller.Seller_id  " +
			"AND TransHistory.TransHistory_buyer_id = Customer.Customer_id  " +
			"AND TransHistory.TransHistory_Product_id = Product.Product_id  " +
			"AND TransHistory.TransHistory_id ="+ req.body.id;
	
	        db.fetchData(function(err,result){
		if (err)
			//throw err;
			console.log("rate error");
		else{
            res.render('transactions', {
			                        title: 'Transaction Detail',
				                    user: req.session.user,   
				                    result: result,
				                    id: req.params.id
			                        });
	};	    
	},trans);
		}
	}, rate);
}