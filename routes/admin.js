var ejs = require('ejs');
//var db = require('../models/db.js');
var db = require('../models/db2.js');

exports.signIn_admin = function(req, res) {
	res.render('signIn_admin', {
		title : 'Ebay'
	});
	
}

exports.afterSignIn_admin = function(req, res) {
	var adminId = "admin";
	var adminPass = "ebayadmin";
	var id = req.param("id");
	var pass = req.param("pass");
	var session = req.session;
	
	console.log(JSON.stringify(session));
	req.session.admin = {
			ID : req.param("id"),
			password : req.param("pass")
	};
	console.log(JSON.stringify(session));
	
	if(id == adminId && pass == adminPass) {
		res.render('homepage_admin', {
			title : 'Ebay'
		});
	}else {
		console.log("wrong admin sign in info....");
		res.render('signIn_admin', {
			title : 'Ebay'
		});
	}		
}

exports.signOut_admin = function(req, res) {
	req.session.admin = null;
	res.render('signIn_admin', {
		title : 'Ebay'
	});
}

exports.toAdminHome = function(req, res) {
	res.render('homepage_admin', {
		title : 'Ebay'
	});
}

function getAllPerson(callback) {
	var show = "select * from Person where Person_buyActivate = 1 or Person_sellActivate = 1";
	//var post = [1];
	console.log("Query is: " + show);
	db.getConnection(function(err, connection) {
		var query = connection.query(show, function(err, result) {
			if(err){
				console.log("err message: " + err.message);
			}else{
				callback(err, result);
				//console.log("info:"+callback);
				console.log("\nConnection closed...");
				connection.release();
			}
		});
		console.log("query is: " + query);
	});	
}

exports.listPerson = function(req, res) {
	getAllPerson(function(err,result) {
		res.render('listPerson_admin', {
			title : 'Ebay',
			show : result
		});
	});
}

function getCustomers(callback) {
	var show = "select * from Person where Person_buyActivate = ?";
	var post = [1];
	console.log("Query is: " + show);
	db.getConnection(function(err, connection) {
		var query = connection.query(show, post,function(err, result) {
			if(err){
				console.log("err message: " + err.message);
			}else{
				callback(err, result);
				//console.log("info:"+callback);
				console.log("\nConnection closed...");
				console.log("result::: "+JSON.stringify(result));
				connection.release();
			}
		});
		console.log("query is: " + query);
	});	
}

exports.listCustomers = function(req, res) {
	getCustomers(function(err,result) {
		res.render('listCustomer_admin', {
			title : 'Ebay',
			show : result
		});
	});
}

function getSellers(callback) {
	var show = "select * from Person where Person_sellActivate = ?";
	var post = [1];
	console.log("Query is: " + show);
	db.getConnection(function(err, connection) {
		var query = connection.query(show, post,function(err, result) {
			if(err){
				console.log("err message: " + err.message);
			}else{
				callback(err, result);
				//console.log("info:"+callback);
				console.log("\nConnection closed...");
				connection.release();
			}
		});
		console.log("query is: " + query);
	});	
}

exports.listSellers = function(req, res) {
	getSellers(function(err,result) {
		res.render('listSeller_admin', {
			title : 'Ebay',
			show : result
		});
	});
}

function getAuctions(callback) {
	var sql = "select p.Product_name, pe.Person_first_name, pe.Person_last_name, p.Product_bid_start_price, p.Product_bid_start_time, " +
			"p.Product_bid_end_time, p.Product_bid_end, p.Product_img " +
			"from Bid b, Product p, Seller s, Person pe " +
			"where b.Bid_product_id=p.Product_id and P.Product_seller_id=s.Seller_id and s.Seller_id = pe.Person_id";
	console.log("sql is :::"+sql);
	db.getConnection(function(err, connection) {
		var query = connection.query(sql, function(err, result) {
			if(err){
				console.log("err message: " + err.message);
			}else{
				callback(err, result);
				//console.log("info:"+callback);
				console.log("\nConnection closed...");
				connection.release();
			}
		});
		console.log("query is: " + query);
	});
}

exports.listAuctions = function(req, res){
	getAuctions(function(err,result) {
		res.render('listAuction_admin', {
			title : 'Ebay',
			show : result
		});
	});
}



exports.toDeleteC = function(req, res) {
	getCustomers(function(err,result) {
		res.render('deleteCustomer_admin', {
			title : 'Ebay',
			show : result
		});
	});
}

exports.deactivateC = function(req, res) {
	var id = req.params.cid;
	console.log("customer id is::"+id);
	var sql = " update Person set Person_buyActivate = 0 where Person_id = ?";
	var post = [id];
	console.log("sql::" + sql);
	db.getConnection(function(err, connection) {
		var query = connection.query(sql, post, function(err, results) {
			if(err){
				console.log("err message: " + err.message);
			}else{
				//callback(err, results);
				console.log("info:"+results);
				console.log("\nConnection closed...");
				connection.release();
				getCustomers(function(err,result) {
					res.render('deleteCustomer_admin', {
						title : 'Ebay',
						show : result
					});
				});
			}
		});
	});
}

exports.toDeleteS = function(req, res) {
	getSellers(function(err,result) {
		res.render('deleteSeller_admin', {
			title : 'Ebay',
			show : result
		});
	});
}

exports.deactivateS = function(req, res) {
	var id = req.params.sid;
	console.log("customer id is::"+id);
	var sql = " update Person set Person_sellActivate = 0 where Person_id = ?";
	var post = [id];
	console.log("sql::" + sql);
	db.getConnection(function(err, connection) {
		var query = connection.query(sql, post, function(err, results) {
			if(err){
				console.log("err message: " + err.message);
			}else{
				//callback(err, results);
				console.log("info:"+results);
				console.log("\nConnection closed...");
				connection.release();
				getSellers(function(err,result) {
					res.render('deleteSeller_admin', {
						title : 'Ebay',
						show : result
					});
				});
			}
		});
	});
}

function getProducts(callback) {
	var show = "select * from Product where Product_quantity > 0";
	//var post = [1];
	console.log("Query is: " + show);
	db.getConnection(function(err, connection) {
		var query = connection.query(show, function(err, result) {
			if(err){
				console.log("err message: " + err.message);
			}else{
				callback(err, result);
				//console.log("info:"+callback);
				console.log("\nConnection closed...");
				connection.release();
			}
		});
	});	
}

exports.toListProduct = function(req, res) {
	getProducts(function(err, result) {
		res.render('listProduct_admin', {
		title : 'Ebay',
		show : result
		});
	});	
}

exports.toDeleteP = function(req, res) {
	getProducts(function(err, result) {
		res.render('deleteProduct_admin', {
		title : 'Ebay',
		show : result
		});
	});
}

exports.deleteP = function(req, res) {
	var id = req.params.pid;
	console.log("product id is::"+id);
	var sql = "update Product set Product_quantity=0  where Product_id =?";
	var post = [id];
	console.log("sql::" + sql);
	db.getConnection(function(err, connection) {
		var query = connection.query(sql, post, function(err, results) {
			if(err){
				console.log("err message: " + err.message);
			}else{
				//callback(err, results);
				console.log("info:"+results);
				console.log("\nConnection closed...");
				connection.release();
				getProducts(function(err,result) {
					res.render('deleteProduct_admin', {
						title : 'Ebay',
						show : result
					});
				});
			}
		});
	});
}