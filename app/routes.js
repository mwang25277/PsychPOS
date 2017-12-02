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

	/***********************************
		Inventory
	************************************/

	app.post('/addInvCategory', function(req, res) {
		console.log(req.query.name);
		models.InventoryCategory.create({
			name: req.query.name
		}).then(function(employee) {
			res.send("Created");
		});

	});

	app.get('/getInvCategory', function(req, res) {
		models.InventoryCategory.findAll({}).then(function(categories) {
			if(categories == null) {
				res.send("Doesn't exist");
			}
			else {
				res.send(categories);
			}

		});
	});

	app.get('/getInvItem', function(req, res) {
		models.Inventory.findAll({ where: {inventory_cat_id: req.query.invCatID }}).then(function(inventory) {
			if(inventory == null) {
				res.send("Doesn't exist");
			}
			else {
				res.send(inventory);
			}

		});
	});

	app.post('/addInventory', function(req, res) {
		console.log(req.query);
		if(req.query.id == 0) {
			delete req.query.id;
			models.Inventory.create(req.query).then(function(response) {
				if(response == null) {
					res.send("Error");
				}
				else {
					res.send(response);
				}

			});
		}
		else {
			models.Inventory.upsert(req.query).then(function(response) {
				if(response == false) {
					res.send("Upsert success");
				}
				else {
					res.send(response);
				}

			});
		}
	});



	/***********************************
		Ingredients
	************************************/

	app.get('/getIngItem', function(req, res) {
		models.Ingredient.findAll({ where: {inventory_cat_id: req.query.invCatID }}).then(function(ingredients) {
			if(ingredients == null) {
				res.send("Doesn't exist");
			}
			else {
				res.send(ingredients);
			}

		});
	});

	app.get('/getInvItemByID', function(req, res) {
		models.Inventory.findOne({ where: {id: req.query.invID }}).then(function(inventory) {
			if(inventory == null) {
				res.send("Doesn't exist");
			}
			else {
				res.send(inventory);
			}

		});
	});

	app.post('/addIngredient', function(req, res) {
		console.log(req.query);
		if(req.query.id == 0) {
			delete req.query.id;
			models.Ingredient.create(req.query).then(function(response) {
				if(response == null) {
					res.send("Error");
				}
				else {
					res.send(response);
				}

			});
		}
		else {
			models.Ingredient.upsert(req.query).then(function(response) {
				if(response == false) {
					res.send("Upsert success");
				}
				else {
					res.send(response);
				}

			});
		}
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

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

}