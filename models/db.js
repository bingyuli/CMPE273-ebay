/**
 * YZ
 */
var mysql = require('mysql');

//node Mysql pool
var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	database:'mydb',
	password: '5245193'
});

//var sqlQuery = "insert into Person (Person_first_name, Person_last_name, Person_zip, Person_address, Person_state, Person_city, Person_ssn, Person_email, Person_pass) values " +
//			   "('q', 'q', '95112', '53S 9th', 'CA', 'San Jose', '987654321', 'q@gmail.com', 'q')";
//insertData(sqlQuery);
function insertData(callback, sqlQuery){
	console.log("\nSQL Query::" + sqlQuery);
	pool.getConnection(function(err, connection){
		connection.query(sqlQuery, function(err, result){
			if(err)
				console.log("There is an error in creating");
			else{
				callback(err, result);
				console.log("creating successfully");
				connection.release();
			}		
		});
	});
}

//var sqlQuery = "select Person_email from Person where Person_id = 1";
//fetchData(sqlQuery);
function fetchData(callback, sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	pool.getConnection(function(err, connection){
		connection.query(sqlQuery, function(err, rows, fields){
			console.log("fetch data  "+err);
			console.log("fetch data  "+ JSON.stringify(err));
			
			if(err){
				console.log("err message: " + err.message);
			}else{
				callback(err, rows);
				console.log(rows);
				console.log("\nConnection closed...");
				connection.release();
			}
		});
	});
}

//var sqlQuery = "delete from Person where Person_id = 1";
//deleteData(sqlQuery);
function deleteData(callback, sqlQuery){
	console.log("\nSQL Query::" + sqlQuery);
	pool.getConnection(function(err, connection){
		connection.query(sqlQuery, function(err, result){
			if(err)
				console.log("There is an error in deleting");
			else{
				callback(err, result);
				console.log("deleting successfully");
				connection.release();
			}
		});
	});
}

//var sqlQuery = "update category set cName = 'cinema' where categoryID = 2";
//updateData(sqlQuery);
function updateData(callback, sqlQuery){
	console.log("\nSQL Query::" + sqlQuery);
	pool.getConnection(function(err, connection){
		connection.query(sqlQuery, function(err, result){
			if(err)
				console.log("There is an error in updating");
			else{
				callback(err, result);
				console.log("updating successfully");
				connection.release();
			}
		});
	});
}

exports.updateData = updateData;
exports.deleteData = deleteData;
exports.insertData = insertData;
exports.fetchData = fetchData;
