var db = require('../models/db.js');

exports.homepage = function(req, res) {
	var categoryName = "SELECT * FROM Category";
	var productName = "SELECT * FROM Product";
	//console.log("Query is: " + categoryName);
	
	db.fetchData(function(err,catresult){
		if (err)
			throw err;
		else{
			db.fetchData(function(err,proresult){
		                if (err)
			                throw err;
		                else{
			                res.render('homepage', {
	                        title: 'HOMEPAGE',
		                    user: req.session.user,   
		                    cat_result: catresult,
                            pro_result: proresult
	                        });
	        }},productName);	    
	};	    
	},categoryName);
		
}

exports.signOut = function(req, res){
	req.session.user= null;	
	req.session.product = null;
	res.redirect('/signIn');
}