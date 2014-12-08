var db = require('../models/db.js');

exports.bactivate = function(req, res){
	var update = "UPDATE Person SET Person.Person_buyActivate = 1 WHERE Person.Person_id = "+ req.session.user.Person_id;
	db.updateData(function(err, resullt){
		if (err)
            throw err;
		else{
			req.session.user.Person_buyActivate= 1;
			//res.redirect('/');
			res.send("200");
		}
	}, update);
};

exports.sactivate = function(req, res){
	var update = "UPDATE Person SET Person.Person_sellActivate = 1 WHERE Person.Person_id = "+ req.session.user.Person_id;
	db.updateData(function(err, resullt){
		if (err)
            throw err;
		else{
			req.session.user.Person_sellActivate= 1;
			//res.redirect('/');
			res.send("200");
		}
	}, update);
};

//exports.bdeactivate = function(req, res){
//	var update = "UPDATE Person SET Person.Person_buyActivate = 0 WHERE Person.Person_id = "+ req.session.user.Person_id;
//	db.updateData(function(err, resullt){
//		if (err)
//            throw err;
//		else{
//			req.session.user.Person_buyActivate= 0;
//			res.redirect('/');
//		}
//	}, update);
//};

exports.bdeactivate = function(req, res){
	var update = "UPDATE Person SET Person.Person_buyActivate = 0 WHERE Person.Person_id = "+ req.session.user.Person_id;
	db.updateData(function(err, resullt){
		if (err)
            throw err;
		else{
			req.session.user.Person_buyActivate= 0;
			res.send("200");
			//res.redirect('/');
		}
	}, update);
};

exports.sdeactivate = function(req, res){
	var update = "UPDATE Person SET Person.Person_sellActivate = 0 WHERE Person.Person_id = "+ req.session.user.Person_id;
	db.updateData(function(err, resullt){
		if (err)
            throw err;
		else{
			req.session.user.Person_sellActivate= 0;
			//res.redirect('/');
			res.send("200");
		}
	}, update);
};