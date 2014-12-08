var ejs = require('ejs');
var db = require('../models/db.js');
//var db = require('../models/db2.js');

exports.showProduct = function(req, res) {
	var pid = req.params.pid;
	console.log("pid="+pid);
	var getinfo = "SELECT * From Product, Category, Seller, Person WHERE Product.Product_category_id = Category.Category_id AND " +
		"Product.Product_seller_id = Seller.Seller_id AND" +
		" Product.Product_quantity >=0 AND Person.Person_id = Seller.Person_id AND Product_id = "+ pid;
	var getbid = "SELECT * From Bid WHERE Bid_price = (SELECT MAX(Bid_price) FROM Bid WHERE Bid_product_id = "+pid + ") AND Bid_product_id = "+pid;
	var show = "SELECT Category_name From Category";
	db.fetchData(function(err,result){
	   if(err)
		   throw err;
	   else {
		   db.fetchData(function(err,bidresult){
			   if(err)
				   throw err;
			   else {
				   db.fetchData(function(err,catresult){
					   if(err)
						   throw err;
					   else {
				   req.session.product= result[0];
				   res.render('productPage',{
					   title: result[0].Product_name,
					   user: req.session.user,
					   result: result,
					   bresult: bidresult,
					   show: catresult
				   });
					   }
					   
				   }, show);
			   }
		   },getbid);
			   
	   }
	},getinfo);
}













//exports.productDetail = function(req, res) {
//	var proid = req.params.proid;
//	console.log("proid = "+proid);
//	getProductInfo(proid, function(err,result) {
//		res.render('productDetail', {
//			title : 'Ebay',
//			show : result
//		});
//	});
//}
//
//function getProductInfo(proid, callback) {
//	
//	var sql = "select * from Product p, Seller s, Person pe where p.Product_id ="+ proid +" and p.Product_seller_id = s.Seller_id and s.Person_id = pe.Person_id";
//	console.log("sql::"+sql);
//	
//	db.getConnection(function(err, connection) {
//		var results = connection.query(sql, function(err, result) {
//			if(err){
//				console.log("err message: " + err.message);
//			}else{
//				callback(err, result);
//				//console.log("info:"+callback);
//				console.log("\nConnection closed...");
//				connection.release();
//			}
//		});
//		console.log("results is: " + results);
//	});	
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//function Product(product){
//	this.id = product.name;
//	this.price = product.price;
//	this.type = product.type;		
//}
//
//exports.showAll = function(req, res){
//   var getall = "SELECT Categorycol From Category";
//   db.fetchData(function(err,result){
//	   if(err)
//		   throw err;
//	   else {
//		   res.render('homepage',{
//			   title: 'Ebay'
//		   });
//	   }
//   });
//}
//
