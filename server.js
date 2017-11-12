// server init + mods
var express = require('express');
var app = express();
var http = require('http').Server(app);

//used to parse request data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var mysql = require('mysql');

var mysql2 = require('mysql2');

// var con = mysql.createConnection({
// 	host: "psychpos.cma6st4fitis.us-east-2.rds.amazonaws.com",
// 	port: "3306",
// 	user: "team9",
// 	password: "mitrfall17",
// 	database: "psychPOS"
// });

// const Sequelize = require('sequelize');
// const SequelizeAuto = require('sequelize-auto');

// const sequelize = new Sequelize('psychPOS', 'team9', 'mitrfall17', {
//   host: "psychpos.cma6st4fitis.us-east-2.rds.amazonaws.com",
//   dialect: 'mysql',
// });

// module.exports = sequelize;

var models = require('./app/models');

//used to create .js file in /models

// var auto = new SequelizeAuto('psychPOS', 'team9', 'mitrfall17', {
//     host: "psychpos.cma6st4fitis.us-east-2.rds.amazonaws.com",
//     dialect: 'mysql',
//     directory: "./models", // prevents the program from writing to disk
//     port: '3306',
//     additional: {
//         timestamps: false
//         //...
//     }
// });

// auto.run(function (err) {
//   if (err) throw err;

//   console.log(auto.tables); // table list
//   console.log(auto.foreignKeys); // foreign key list
// });

// const Employee = sequelize.import(__dirname + "/models/Employee.js");

// Employee.findAll().then(users => {
//   console.log(users);
// });

app.use(express.static(__dirname + '/public'));

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
	app.listen(3000, function() {
		console.log("Listening");
	});
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });




// con.connect(function(err) {
// 	if(err) throw err;
// 	console.log("Connected!");
// 	var sql = "INSERT INTO Employee (name, password, isAdmin) VALUES ('Max Wang', 'password', 0)";
// 	con.query(sql, function (err, result) {
// 		if(err) throw err;
// 		console.log("1 record inserted");
// 	});
// 	con.query("SELECT * FROM Employee", function (err, result, fields) {
//     if (err) throw err;
//     	console.log(result);
//   });
// });

//routes

require('./app/routes')(app);


exports = module.exports = app;

