var ejs = require('ejs');
var db = require('../models/db2.js');
var db1 = require('../models/db.js');

exports.toSearchPerson = function(req, res) {
	res.render('searchPersonPage', {
		title : 'Ebay'
	});
}

exports.searchPerson = function(req, res) {

	var email = req.param("email");
	var fn = req.param("firstname");
	var ln = req.param("lastname");
	var address = req.param("address");
	var city = req.param("city");
	var state = req.param("state");
	var zip = req.param("zip");

	console.log("new email is::" + email + "new first name is::"+ fn 
		+ "; new last name is ::" + ln + "new address is::"+ address 
		+ "; new city is ::" + city + "new state is::"+ state 
		+ "; new zip is ::" + zip);
	

	if(email.length > 0 || fn.length > 0 || ln.length > 0
	 ||address.length > 0 ||city.length > 0|| state.length > 0) {
		var sql = " SELECT * FROM Person WHERE ( Person_email = '" + email
				+ "'OR Person_first_name = '" + fn
				+ "'OR Person_last_name = '" + ln
				+ "'OR Person_address = '" + address
				+ "'OR Person_city = '" + city
				+ "'OR Person_state = '" + state
				+ "'OR Person_zip = '" + zip
				+ "' );";

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
			
					console.log("~~in session the email is::" + req.session.user.Person_email
						+ ", the first name is::" + req.session.user.Person_first_name
						+ ", the last name is::" + req.session.user.Person_last_name
						+ ", the address is::" + req.session.user.Person_address
						+ ", the city is::" + req.session.user.Person_city
						+ ", the state is::" + req.session.user.Person_state
						+ ", the zip is::" + req.session.user.Person_zip
						);

					res.render('searchPersonResult', {
                    	title: 'Search Person Result',
                    	show: results
                	});

				}
			});
		});
	}
}