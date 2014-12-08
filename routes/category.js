var db = require('../models/db.js');

exports.showCategory = function(req,res) {
	var categoryName = "SELECT * FROM Category";
	var productName = "SELECT * FROM Product, Category WHERE Product_category_id = Category_id AND Product_category_id ="+ req.params.id;
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
	                        title: proresult[0].Category_name,
		                    user: req.session.user,   
		                    cat_result: catresult,
                            pro_result: proresult
	                        });
	        }},productName);	    
	};	    
	},categoryName);
};