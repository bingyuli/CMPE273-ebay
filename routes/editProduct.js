var ejs = require('ejs');
var db = require('../models/db2.js');
var db1 = require('../models/db.js');

exports.toEditProduct = function(req, res) {
	res.render('editProduct', {
		title : 'Ebay'
	});
}

exports.editProduct = function(req, res) {
	var pid = req.session.product.Product_id;
	console.log("product id is::"+pid);
	var newN = req.param("newname");
	var newCt = req.param("newcategoryid");
	var newP = req.param("newprice");
	var newCd = req.param("newcondition");
	var newI = req.param("newinfo");
	var newQ = req.param("newquantity");
	var newIMG = req.param("newimg");

	console.log("new product name is::"+ newN + "; new category id is ::" + newCt
		+ "new price is::"+ newP + "; new condition is ::" + newCd
	    + "; new info is ::" + newI + "new quantity is::"+ newQ 
	    + "new img is::"+ newIMG
		);
	if(newN.length > 0 || newCt.length > 0 ||newP.length > 0 ||newCd.length > 0||
		newI.length > 0|| newQ.length > 0|| newIMG.length > 0) {
		var sql = " update Product set Product_name = '" + newN
				+ "', Product_category_id = '" + newCt
				+ "', Product_price = '" + newP
				+ "', Product_condition = '" + newCd
				+ "', Product_info = '" + newI
				+ "', Product_quantity = '" + newQ
				+ "', Product_img = '" + newIMG
				+ "' where Product_id =" + pid;
		console.log("sql::" + sql);
		db.getConnection(function(err, connection) {
			var query = connection.query(sql, function(err, results) {
				if(err){
					console.log("err message: " + err.message);
				}else{
					//callback(err, results);
					console.log("info:"+results);
					console.log("\nConnection closed...");
					connection.release();
					req.session.product.Product_name = newN;
					req.session.product.Product_category_id = newCt;
					req.session.product.Product_price = newP;
					req.session.product.Product_condition = newCd;
					req.session.product.Product_info = newI;
					req.session.product.Product_quantity = newQ;
					req.session.product.Product_img = newIMG;

					console.log("~~in session the product name is::" + req.session.product.Product_name
						+ ", the category id is::" + req.session.product.Product_category_id
						+ ", the price is::" + req.session.product.Product_price
						+ ", the condition is::" + req.session.product.Product_condition
						+ ", the info is::" + req.session.product.Product_info
						+ ", the quantity is::" + req.session.product.Product_quantity
						+ ", the img is::" + req.session.product.Product_img

						);

					res.render('editProductSucc', {
                    	title: 'Product Information',
                    	//result: results
                	});
				
				}
			});
		});
	}
}