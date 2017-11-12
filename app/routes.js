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

}