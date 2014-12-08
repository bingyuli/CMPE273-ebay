var ejs = require('ejs');
var db = require('../models/db2.js');
var db1 = require('../models/db.js');


exports.toEditEmail = function(req, res) {
	res.render('editEmail', {
		title : 'Ebay'
	});
}

exports.editEmail = function(req, res) {
	var uid = req.session.user.Person_id;
	console.log("user id is::"+uid);
	var newE = req.param("newemail");
	var rNewE = req.param("retypeemail");
	console.log("new email is::"+newE+"; retype email is::"+rNewE);
	if(newE == rNewE && newE.length > 0) {
		var sql = " update Person set Person_email = '" + newE + "' where Person_id =" + uid;
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
					req.session.user.Person_email = newE;
					console.log("~~in session the email is::" + req.session.user.Person_email);

					
					var getUserInfo = "SELECT * FROM Person, Seller WHERE Person.Person_id = Seller.Person_id AND Person.Person_id = "+ req.session.user.Person_id;
					var getSellInfo = "SELECT * FROM TransHistory, Product, Seller WHERE Seller_id = TransHistory_Seller_id AND TransHistory_Product_id = Product_id AND Seller.Person_id = "
						+ req.session.user.Person_id;
					var getBuyInfo = "SELECT * FROM TransHistory, Product, Customer WHERE Customer_id = TransHistory_Buyer_id AND TransHistory_Product_id = Product_id AND Customer.Person_id = "
						+ req.session.user.Person_id;
					
					db1.fetchData(function(err,presult){
						if (err)
							throw err;
						else{
							db1.fetchData(function(err,sresult){
						                if (err)
							                throw err;
						                else{
						                	db1.fetchData(function(err,bresult){
								                if (err)
									                throw err;
								                else{
									                res.render('myAccount', {
							                        title: 'My Account',
								                    user: req.session.user,   
								                    presult: presult,
						                            sresult: sresult,
						                            bresult: bresult
							                        });
							        }},getBuyInfo);
					        }},getSellInfo);	    
					};	    
					},getUserInfo);
					
//					res.render('myAccount', {
//						title : 'Ebay'
//					});
				}
			});
		});
	}else{
		res.render('checkEditEmail', {
			title : 'Ebay'
		});
	}
}


exports.toEditPassword = function(req, res) {
	res.render('editPassword', {
		title : 'Ebay'
	});
}

exports.editPassword = function(req, res) {
	var uid = req.session.user.Person_id;
	console.log("user id is::"+uid);
	var newP = req.param("newpassword");
	var rNewP = req.param("retypepassword");
	console.log("new password is::"+newP+"; retype password is::"+rNewP);
	if(newP == rNewP && newP.length > 0) {
		var sql = " update Person set Person_pass = '" + newP + "' where Person_id =" + uid;
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
					req.session.user.Person_pass = newP;
					console.log("~~in session the password is::" + req.session.user.Person_pass);

					
					var getUserInfo = "SELECT * FROM Person, Seller WHERE Person.Person_id = Seller.Person_id AND Person.Person_id = "+ req.session.user.Person_id;
					var getSellInfo = "SELECT * FROM TransHistory, Product, Seller WHERE Seller_id = TransHistory_Seller_id AND TransHistory_Product_id = Product_id AND Seller.Person_id = "
						+ req.session.user.Person_id;
					var getBuyInfo = "SELECT * FROM TransHistory, Product, Customer WHERE Customer_id = TransHistory_Buyer_id AND TransHistory_Product_id = Product_id AND Customer.Person_id = "
						+ req.session.user.Person_id;
					
					db1.fetchData(function(err,presult){
						if (err)
							throw err;
						else{
							db1.fetchData(function(err,sresult){
						                if (err)
							                throw err;
						                else{
						                	db1.fetchData(function(err,bresult){
								                if (err)
									                throw err;
								                else{
									                res.render('myAccount', {
							                        title: 'My Account',
								                    user: req.session.user,   
								                    presult: presult,
						                            sresult: sresult,
						                            bresult: bresult
							                        });
							        }},getBuyInfo);
					        }},getSellInfo);	    
					};	    
					},getUserInfo);
					
//					res.render('myAccount', {
//						title : 'Ebay'
//					});
				}
			});
		});
	}else{
		res.render('checkEditPassword', {
			title : 'Ebay'
		});
	}
}

exports.toEditNameAddress = function(req, res) {
	res.render('editNameAddress', {
		title : 'Ebay'
	});
}

exports.editNameAddress = function(req, res) {
	var uid = req.session.user.Person_id;
	console.log("user id is::"+uid);
	var newFN = req.param("newfirstname");
	var newLN = req.param("newlastname");
	var newA = req.param("newaddress");
	var newC = req.param("newcity");
	var newS = req.param("newstate");
	var newZ = req.param("newzip");
	var newSSN = req.param("newssn");

	console.log("new first name is::"+ newFN + "; new last name is ::" + newLN
		+ "new address is::"+ newA + "; new city is ::" + newC
		+ "new state is::"+ newS + "; new zip is ::" + newZ + "new ssn is::"+ newSSN);
	if(newFN.length > 0 || newLN.length > 0 ||newA.length > 0 ||newC.length > 0||
		newS.length > 0|| newZ.length > 0|| newSSN.length > 0) {
		var sql = " update Person set Person_first_name = '" + newFN
				+ "', Person_last_name = '" + newLN
				+ "', Person_address = '" + newA
				+ "', Person_city = '" + newC
				+ "', Person_state = '" + newS
				+ "', Person_zip = '" + newZ
				+ "', Person_ssn = '" + newSSN
				+ "' where Person_id =" + uid;
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
					req.session.user.Person_first_name = newFN;
					req.session.user.Person_last_name = newLN;
					req.session.user.Person_address = newA;
					req.session.user.Person_city = newC;
					req.session.user.Person_state = newS;
					req.session.user.Person_zip = newZ;
					req.session.user.Person_ssn = newSSN;

					console.log("~~in session the first name is::" + req.session.user.Person_first_name
						+ ", the last name is::" + req.session.user.Person_last_name
						+ ", the address is::" + req.session.user.Person_address
						+ ", the city is::" + req.session.user.Person_city
						+ ", the state is::" + req.session.user.Person_state
						+ ", the zip is::" + req.session.user.Person_zip
						+ ", the ssn is::" + req.session.user.Person_ssn
						);

					
					var getUserInfo = "SELECT * FROM Person, Seller WHERE Person.Person_id = Seller.Person_id AND Person.Person_id = "+ req.session.user.Person_id;
					var getSellInfo = "SELECT * FROM TransHistory, Product, Seller WHERE Seller_id = TransHistory_Seller_id AND TransHistory_Product_id = Product_id AND Seller.Person_id = "
						+ req.session.user.Person_id;
					var getBuyInfo = "SELECT * FROM TransHistory, Product, Customer WHERE Customer_id = TransHistory_Buyer_id AND TransHistory_Product_id = Product_id AND Customer.Person_id = "
						+ req.session.user.Person_id;
					
					db1.fetchData(function(err,presult){
						if (err)
							throw err;
						else{
							db1.fetchData(function(err,sresult){
						                if (err)
							                throw err;
						                else{
						                	db1.fetchData(function(err,bresult){
								                if (err)
									                throw err;
								                else{
									                res.render('myAccount', {
							                        title: 'My Account',
								                    user: req.session.user,   
								                    presult: presult,
						                            sresult: sresult,
						                            bresult: bresult
							                        });
							        }},getBuyInfo);
					        }},getSellInfo);
						}
					},getUserInfo);
//					res.render('myAccount', {
//						title : 'Ebay'
//					});
				}
			});
		});
	}else{
		res.render('checkEditNameAddress', {
			title : 'Ebay'
		});
	}
}