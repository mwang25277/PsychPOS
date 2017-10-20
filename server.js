// server init + mods
var express = require('express');
var app = express();
var http = require('http').Server(app);


app.use(express.static('public_html'));

http.listen(3000, function() {
	console.log("Listening");
});

