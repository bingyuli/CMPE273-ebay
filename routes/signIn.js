var ejs = require('ejs');
var db = require('../models/db.js');

exports.signIn = function(req, res) {
	res.render('signIn', {
		title : 'Ebay'
	});
};

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

exports.afterSignIn = function(req, res) {
	var session = req.session;
	console.log(JSON.stringify(session));
	var getUser = "select * from Person , Seller, Customer where Person.Person_id = Seller.Person_id AND " +
			"Seller.Person_id = Customer.Person_id AND (Person_email, Person_pass) = ('"+ req.param("email") + "', '" + req.param("pass") + "')";
	console.log("Query is: " + getUser);
	
	db.fetchData(function(err, result) {
		if (err){
			throw err;
		}
		else {
			console.log("result = "+ JSON.stringify(result));
			if (result.length > 0) {
				req.session.user = result[0];
				console.log(req.session.user);
				console.log("valid login~~");
				
				getCategory(function(result) {
					res.render('homepage', {
						title : 'Ebay',
						show : result
					});
				});				
				
			}else {
				console.log("invalid login");
				ejs.renderFile('./views/failSignIn.ejs', function(err,
						result) {
					if (!err) {
						res.end(result);
					} else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}
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