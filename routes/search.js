var ejs = require('ejs');
var db = require('../models/db.js');
//var db = require('../models/db2.js');

exports.searchProduct = function(req, res){
	var text = req.param("pname");
	var cat = req.body.cat;
	//var condition= req.param("condition");
	console.log(text);
	console.log(cat);
	if(text.length > 0 && cat > 0 && cat < 9) {
		var getinfo = "select * from Product p, Category c, Seller s, Person pe " +
		  "Where p.Product_Category_id= c.Category_id and p.Product_seller_id=s.Seller_id and s.Seller_id=pe.Person_id and UPPER(p.Product_name)=UPPER('"+text+"') " +
		  "and c.Category_id = "+cat;
		console.log("getinfo query::"+getinfo);
		db.fetchData(function(err,result){
			if(err) {
				throw err;
			}
			else {
				if(result.length == 0) {
					res.render('failSearch',{
						title: 'fail search'
					});
				}else {
					console.log(result[0].Product_name);
					res.render('productSearchResult',{
						title: result[0].Product_name,
						user: req.session.user,
						result: result
					}); 
				}
				
			}
		},getinfo);
	}else if(text.length > 0 && cat == 9) {
		//var getinfo = "select * from product where UPPER(Product_name)=UPPER('"+text+"')";
		var getinfo = "select * from Product p, Seller s, Person pe " +
		  "Where p.Product_seller_id=s.Seller_id and s.Seller_id=pe.Person_id and UPPER(p.Product_name)=UPPER('"+text+"')";
		console.log("getinfo query::"+getinfo);
		db.fetchData(function(err,result){
			if(err) {
				throw err;

			}
			else {
				if(result.length == 0) {
					res.render('failSearch',{
						title: 'fail search'
					});
				}else {
					console.log(result[0].Product_name);
					res.render('productSearchResult',{
						title: result[0].Product_name,
						user: req.session.user,
						result: result
					});
				}
				 
			}
		},getinfo);
	}else if(text.length == 0 && cat == 9) {
		var getinfo = "select * from Product p, Seller s, Person pe " +
				"where p.Product_seller_id=s.Seller_id and s.Seller_id=pe.Person_id";
		console.log("getinfo query::"+getinfo);
		db.fetchData(function(err,result){
			if(err) {
				throw err;

			}
			else {
				if(result.length == 0) {
					res.render('failSearch',{
						title: 'fail search'
					});
				}else {
					console.log(result[0].Product_name);
					res.render('productSearchResult',{
						title: result[0].Product_name,
						user: req.session.user,
						result: result
					});
				}
			}
		},getinfo);
	}else if(text.length == 0 && cat > 0 && cat < 9){
		var getinfo = "select * from Product p, Seller s, Person pe " +
				"where p.Product_seller_id=s.Seller_id and s.Seller_id=pe.Person_id and p.Product_category_id = "+cat;
		console.log("getinfo query::"+getinfo);
		db.fetchData(function(err,result){
			if(err){
				throw err;

			}				
			else {
				if(result.length == 0) {
					res.render('failSearch',{
						title: 'fail search'
					});
				}else {
					console.log(result[0].Product_name);
					res.render('productSearchResult',{
						title: result[0].Product_name,
						user: req.session.user,
						result: result
					});
				}
			}
		},getinfo);
	}else {
		res.render('failSearch',{
			title: 'fail search'
		});
	}

}

