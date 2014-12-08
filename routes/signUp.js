var ejs = require('ejs');
var db = require('../models/db2.js');

exports.signUp = function(req, res) {
	res.render('signUp', {
		title : 'Ebay'
	});
};


exports.afterSignUp = function(req, res) {
	var fname = req.param("firstname");
	var lname = req.param("lastname");
	var email = req.param("email");
	var pass = req.param("pass");
	var rpass = req.param("rpass");
	var addr = req.param("address");
	var state = req.param("state");
	var city = req.param("city");
	var zip = req.param("zip");
	var ssn = req.param("ssn");
	var found = false;
	var states = ["AK","AZ","AL","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH"
	              ,"NJ","NM", "NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
	for (var i = 0; i < states.length; i++) {
		  if (states[i] == state) {
		    found = true;
		    break;
		  }
		}
	if(!/[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.test(ssn)){
		res.render('failSignUp',{
			error: 'invalid ssn format'
		})
	}
	if(!(/[0-9][0-9][0-9][0-9][0-9]/.test(zip) || (/[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/.test(zip)))){
		res.render('failSignUp',{
			error: 'invalid zip format'
		})
	}
	if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
		res.render('failSignUp',{
			error: 'invalid email format'
		})
	}
	if(pass!=rpass){
		res.render('failSignUp',{
			error: 'passwords not match'
		})
	}
	
	if(!found){
		res.render('failSignUp',{
			error: 'Please input Correct State Abbreviation'
		})
	}
	else{
	//if(pass == rpass && pass.length >= 6) {
		//var userInfo = "insert into Person (Person_first_name, Person_last_name, Person_zip, Person_address, Person_state, Person_city, Person_ssn, Person_email, Person_pass) values ('"
		//		+ fname + "', '" + lname + "', '" + zip + "', '" + addr + "', '" + state + "', '" + city + "', '" + ssn + "', '" + email + "', '" + pass + "')";
		var userInfo = "insert into Person SET ?";
		var value = {Person_first_name:fname, Person_last_name:lname, Person_zip:zip, Person_address:addr, Person_state:state, Person_city:city, Person_ssn:ssn, Person_email:email, Person_pass:pass};
		console.log("Query is: " + userInfo);
		 db.getConnection(function(err,connection){
				connection.query(userInfo, value, function(err, result){
					if(err){
						res.render('failSignUp',{
							error: 'This email or SSN may be used already'
						})
					}	
					else{
						res.redirect('/signIn');
						connection.release();
					}
				});
		 });
	}
	//}else {
//		console.log("passwords are not the same.")
//		res.render('signUp', {
//			title : 'Express'
//		});
//	}	
};