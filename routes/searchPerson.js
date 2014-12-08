var db = require('../models/db.js');

exports.showUser = function(req, res){
	var getUserInfo = "SELECT * FROM Person, Seller WHERE Person.Person_id = Seller.Person_id AND Person.Person_id = "+ req.session.user.Person_id;
	var getSellInfo = "SELECT * FROM TransHistory, Product, Seller WHERE Seller_id = TransHistory_Seller_id AND TransHistory_Product_id = Product_id AND Seller.Person_id = "
		+ req.session.user.Person_id;
	var getBuyInfo = "SELECT * FROM TransHistory, Product, Customer WHERE Customer_id = TransHistory_Buyer_id AND TransHistory_Product_id = Product_id AND Customer.Person_id = "
		+ req.session.user.Person_id;
	
	db.fetchData(function(err,presult){
		if (err)
			throw err;
		else{
			db.fetchData(function(err,sresult){
		                if (err)
			                throw err;
		                else{
		                	db.fetchData(function(err,bresult){
				                if (err)
					                throw err;
				                else{
					                res.render('myaccount', {
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
}

exports.afterSearchUser= function(req, res){
	var fn = req.param("first_name");
	var ln = req.param("last_name");
	var sellr = req.param("seller_rating");
	
	var sellA= req.param("sellActivate");
	var buyA = req.param("buyActivate")
	console.log(buyA);
	console.log(sellA);
	var getUserInfo;

	if(fn.length>0)
		{	
		if(ln.length>0)
			{
			if(sellr.length>0)
				{
					if (buyA==1)
							 	{
							 if(sellA==1)
								 	{
								 	getUserInfo= "select Distinct * from Person as P, Seller as S where P.Person_id=S.Seller_id and UPPER(Person_first_name)=UPPER('"+fn+"') and UPPER(Person_last_name)=UPPER('"+ln+"') and Seller_rate>'"+sellr+"' and Person_buyActivate=1 and Person_sellActivate=1";
								 	}
							 else
								 getUserInfo= "select Distinct * from Person as P, Seller as S where P.Person_id=S.Seller_id and UPPER(Person_first_name)=UPPER('"+fn+"') and UPPER(Person_last_name)=UPPER('"+ln+"') and Seller_rate>'"+sellr+"' and Person_buyActivate=1";
							 	}
					else getUserInfo = "select Distinct * from Person as P, Seller as S where P.Person_id=S.Seller_id and UPPER(Person_first_name)=UPPER('"+fn+"') and UPPER(Person_last_name)=UPPER('"+ln+"') and Seller_rate>'"+sellr+"'";
						}
			else getUserInfo= "select Distinct * from Person as P, Seller as S where P.Person_id=S.Seller_id and UPPER(Person_first_name)=UPPER('"+fn+"') and UPPER(Person_last_name)=UPPER('"+ln+"')";

			}
		else getUserInfo= "select Distinct * from Person as P, Seller as S where P.Person_id=S.Seller_id and UPPER(Person_first_name)=UPPER('"+fn+"')";
		}
	else if(ln.length>0)
	{
		if(sellr.length>0)
			{
				if (buyA==1)
						 	{
						 if(sellA==1)
							 	{
							 	getUserInfo= "select Distinct * from Person as P, Seller as S where P.Person_id=S.Seller_id and UPPER(Person_last_name)=UPPER('"+ln+"') and Seller_rate>'"+sellr+"' and Person_buyActivate=1 and Person_sellActivate=1";
							 	}
						 else
							 getUserInfo= "select Distinct * from Person as P, Seller as S where P.Person_id=S.Seller_id and UPPER(Person_last_name)=UPPER('"+ln+"') and Seller_rate>'"+sellr+"' and Person_buyActivate=1";
						 	}
				else getUserInfo = "select Distinct * from Person as P, Seller as S where P.Person_id=S.Seller_id and UPPER(Person_last_name)=UPPER('"+ln+"') and Seller_rate>'"+sellr+"'";
					}
		else getUserInfo= "select Distinct * from Person as P, Seller as S where P.Person_id=S.Seller_id and UPPER(Person_last_name)=UPPER('"+ln+"')";

		}
	else if(sellr.length>0)
		{
		
			 if (buyA==1)
				 	{
				 if(sellA==1)
					 	getUserInfo= "select * from Person as P, Seller as S where P.Person_id=S.Seller_id and Seller_rate>'"+sellr+"' and Person_buyActivate=1 and Person_sellActivate=1";
				  else
					 getUserInfo= "select * from Person as P, Seller as S where P.Person_id=S.Seller_id and Seller_rate>'"+sellr+"' and Person_buyActivate=1";
				 	}
			 else getUserInfo= "select * from Person as P, Seller as S where P.Person_id=S.Seller_id and Seller_rate>'"+sellr+"'";
			 
			}
		
	else if( buyA==1)
		{
			 if(sellA==1)
				 	{
				 	getUserInfo= "select * from Person as P, Seller as S where P.Person_id=S.Seller_id and Person_buyActivate=1 and Person_sellActivate=1";
				 	}
			 else
				 getUserInfo= "select * from Person as P, Seller as S where P.Person_id=S.Seller_id and Person_buyActivate=1";
			 	}
	else if(sellA==1)
	{
	 	getUserInfo= "select * from Person as P, Seller as S where P.Person_id=S.Seller_id and Person_sellActivate=1";
	 	}
	db.fetchData(function(err,result){
		if (err){
			throw res.render('errorPage', {
				error: 'Either no Person is found with the search categories or an error occured with'
				
			});
	}
		else{
			res.render('personresult', {
				title:'Persons',
				result: result
			});
			}
	},getUserInfo);	
}


exports.searchUser= function(req, res){
	 
	
		res.render('searchUser',{
			title:'searchUser'
		});
}
	
