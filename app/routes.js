var models = require('./models');

module.exports = function(app) {

	//server routes go here

	app.post('/employeeLogin', function(req, res) {
		console.log(req.query.userID);
		models.Employee.findOne({
			where: {id: parseInt(req.query.userID)}
		}).then(function(employee) {
			console.log(employee);
			if(employee == null) {
				res.send("Not found");
			}
			else {
				res.send(employee.dataValues);
			}
		});

	});

	app.post('/getCategory', function(req, res) {
		console.log(req.query.row);

		models.MenuCategory.findOne({
			where: {
				row: req.query.row,
				col: req.query.col
			}
		}).then(function(category) {
			if(category == null) {
				res.send("Doesn't exist");
			}
			else {
				res.send(category);
			}

		});
	});

	app.post('/getMenuItem', function(req, res) {
		console.log(req.query.row);

		models.MenuItem.findOne({
			where: {
				row: req.query.row,
				col: req.query.col
			}
		}).then(function(menuItem) {
			console.log(menuItem);
			res.send(menuItem);
		});
	});







	// route to handle all angular requests ===========================================================
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

}