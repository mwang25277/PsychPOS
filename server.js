// server init + mods
var express = require('express');
var app = express();
var http = require('http').Server(app);

var mysql = require('mysql');

var con = mysql.createConnection({
	host: "psychpos.cma6st4fitis.us-east-2.rds.amazonaws.com",
	port: "3306",
	user: "team9",
	password: "mitrfall17",
	database: "psychPOS"
});

con.connect(function(err) {
	if(err) throw err;
	console.log("Connected!");
	var sql = "INSERT INTO Employee (name, password, isAdmin) VALUES ('Max Wang', 'password', 0)";
	con.query(sql, function (err, result) {
		if(err) throw err;
		console.log("1 record inserted");
	});
	con.query("SELECT * FROM Employee", function (err, result, fields) {
    if (err) throw err;
    	console.log(result);
  });
});	


app.use(express.static('public_html'));

http.listen(3000, function() {
	console.log("Listening");
});

