var ejs = require('ejs');
//var db = require('../models/db.js');
var db = require('../models/db2.js');

exports.addToCart = function(req, res) {
	var personid = req.session.user.Person_id;
	var productid = req.body.proid;
	var seller_id = req.body.sellerid;
	//var seller_id = req.session.detail.Product_seller_id;
	var sql = "insert into Shoppingcart (Item_product_id, Item_person_id, Item_seller_id) values ("+productid+", "+personid+", "+seller_id+")";
	console.log("sql::"+ sql);
	
	db.getConnection(function(err,connection){
		connection.query(sql, function(err, result){
			if(err){
				throw err;
			}	
			else{
				getProduct(personid, function(results){
					console.log(JSON.stringify(results));
					var total = 0;
					for(var i = 0; i < results.length; i++){
						total += parseInt(results[i].Product_price);
					}
					//res.send(results);
					console.log(JSON.stringify(results));
					res.render('shoppingcart', {
						title : 'Ebay',
						sc : results,
						total:total
					});
				});
				connection.release();
			}
		});
 });

}

exports.toshoppingcart = function(req,res){
	
	var pid = req.session.user.Person_id;
	console.log("pid = "+pid);
	getProduct(pid, function(results){
		console.log(JSON.stringify(results));
		var total = 0;
		for(var i = 0; i < results.length; i++){
			//total += parseInt(results[i].Product_price);
			total += results[i].Product_price;
		}
		//res.send(results);
		console.log(JSON.stringify(results));
		res.render('shoppingcart', {
			title : 'Ebay',
			sc : results,
			total:total
		});
	});

}

exports.checkout = function(req, res){
	var pid = req.session.user.Person_id;
	insertToTran(pid,function(result){
		minusProductQuantity(pid,function(result){
			removeFromSC(pid,function(result){
				//res.send("succ");
				res.render('finishPay', {
					title : 'Ebay'
				})
			});
		});
	});
}

exports.payment = function(req, res){
	res.render("payment",{
		title:"payment"
	});
}


function insertToTran(pid, callback){
	//var sql= "INSERT INTO TransHistory (TransHistory_Product_id, TransHistory_Buyer_id, TransHistory_Seller_id, TransHistory_time, TransHistory_type) SELECT Item_product_id, Item_person_id, Item_seller_id, now(), 1 FROM Shoppingcart where Item_person_id="+pid;
	var sql= "INSERT INTO TransHistory (TransHistory_Product_id, TransHistory_Buyer_id, TransHistory_Seller_id, TransHistory_time, TransHistory_type, TransHistory_price) SELECT Item_product_id, Customer.Customer_id, Item_seller_id, now(), 1, Product_price" 
		+ " FROM Customer, Shoppingcart, Product where Item_product_id = Product.Product_id AND Customer.Person_id = Shoppingcart.Item_person_id AND Item_person_id="+pid;
	exe(sql, function(result){
		callback(result);
	});
}

function removeFromSC(personId, callback){
	var sql = "delete from Shoppingcart where Item_person_id = " + personId;
	exe(sql , function(result){
		callback(result);
	});
}

function minusProductQuantity(personId, callback){
	var sql = "update Product set Product_quantity = Product_quantity - 1 where Product_id in (select Item_product_id from Shoppingcart where Item_person_id = "+personId+")";
	exe(sql, function(result){
		callback(result);
	});
}

function getProduct(pid, callback){
	var sql = "select * from Product p, Shoppingcart s where p.Product_id = s.Item_product_id and Item_person_id = "+ pid;
	console.log(sql);
	exe(sql, function(results){
		callback(results);
	});
}


function exe(sql, callback){
	db.getConnection(function(err, connection) {
		connection.query(sql, function(err,results){
			if(err){
				console.log("fail to run sql = " + sql);
				return;
			}
				
			callback(results);
		});
	});
}