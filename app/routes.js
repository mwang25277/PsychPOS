var models = require('./models');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('psychPOS', 'team9', 'mitrfall17', { 
  host: "psychpos.cma6st4fitis.us-east-2.rds.amazonaws.com",
  dialect: 'mysql'
});
const Op = Sequelize.Op;
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

	/***********************************
		Modifier Template
	************************************/

	app.get('/getTemplateNames', function(req, res) {
		models.ModifierTemplate.findAll({}).then(function(templates) {
			if(templates == null) {
				res.send([]);
			}
			else {
				res.send(templates);
			}

		});
	});

	app.post('/getRemainingIngredients', function(req, res) {
		console.log(req.query);
		var selectedIngs = JSON.parse(req.query.selectedIngredients);
		if(selectedIngs.length > 0) { 
			models.Ingredient.findAll({where:
				{
					inventory_cat_id: req.query.category_id,
					id: {
						[Op.notIn]: selectedIngs
					}
				}
			}).then(function(ingredients) {
				if(ingredients == null) {
					res.send([]);
				}
				else {
					res.send(ingredients);
				}

			});
		}
		else {
			models.Ingredient.findAll({where:
				{
					inventory_cat_id: req.query.category_id,
				}
			}).then(function(ingredients) {
				if(ingredients == null) {
					res.send([]);
				}
				else {
					res.send(ingredients);
				}

			});
		}
	});

	app.get('/getModTemps', function(req,res) {
		models.ModifierTemplate.findAll({}).then(function(modTemps) {
			if(modTemps == null) {
				res.send([]);
			}
			else {
				res.send(modTemps);
			}
		});
	});

	app.post('/addModTemplate', function(req,res) {
		models.ModifierTemplate.create({name: req.query.name}).then(function(modTemp) {
			console.log(modTemp);
			if(modTemp == null) {
				res.send("error");
			}
			else {
				var ings = JSON.parse(req.query.ingredients);
				console.log(ings);
				for(var i = 0; i < ings.length; i++) {
					console.log("hello");
					models.Ingredient_to_ModTemp.create({
						ingredient_id: ings[i].ingredient_id,
						modtemp_id: modTemp.dataValues.id,
						row: ings[i].row,
						col: ings[i].col 
					}).then(function(join) {
						console.log("Created");
					});
				}
			}
		});
	});


	/***********************************
		Menu Items
	************************************/


	app.post('/addMenuCategory', function(req, res) {
		console.log(req.query.name);
		models.MenuCategory.create({
			name: req.query.name
		}).then(function(employee) {
			res.send("Created");
		});

	});

	app.get('/getMenuCategory', function(req, res) {
		models.MenuCategory.findAll({}).then(function(categories) {
			if(categories == null) {
				res.send("Doesn't exist");
			}
			else {
				res.send(categories);
			}

		});
	});

	app.get('/getMenuItemByID', function(req, res) {
		console.log(req.query);

		models.MenuItem.findOne({
			where: {
				id: req.query.id
			}
		}).then(function(menuItem) {
			console.log(menuItem);
			res.send(menuItem);
		});
	});

	app.get('/getMenuItemIngs', function(req, res) {
		console.log(req.query);

		sequelize.query("SELECT Ingredient.* From MenuItem_to_Ingredient, Ingredient WHERE Ingredient.id = MenuItem_to_Ingredient.Ingredient_id AND MenuItem_id = " + req.query.id.toString(),
						{type: sequelize.QueryTypes.SELECT}).then(results=> {
			console.log(results);
			res.send(results);
		});
		// models.MenuItem_to_Ingredient.findAll({
		// 	where: {
		// 		MenuItem_id: req.query.id
		// 	},
		// 	include: [{ model: models.Ingredient, where : {id: Sequelize.col('Ingredient_id')} }]
		// }).then(function(menuItemIngredients) {
		// 	console.log(menuItemIngredients);
		// 	res.send(menuItemIngredients);
		// });
	});

	app.get('/getMenuItems', function(req, res) {
		console.log(req.query);

		models.MenuItem.findAll({
			where: {
				category_id: req.query.menu_cat_id
			}
		}).then(function(menuItems) {
			console.log(menuItems);
			res.send(menuItems);
		});
	});

	app.post('/addMenuItem', function(req, res) {
		console.log(req.query);
		delete(req.query.id);
		var ings = JSON.parse(req.query.ingredients);
		delete(req.query.ingredients);
		console.log(ings);
		models.MenuItem.create(req.query).then(menuItem => {
			console.log(menuItem.get({plain: true}));
			for(var i = 0; i < ings.length; i++) {
				models.MenuItem_to_Ingredient.create({ MenuItem_id: menuItem.dataValues.id, Ingredient_id: ings[i].id}).then(function(joined) {
					res.send(joined);
				});
				console.log(ings[i].id);
			}
		});

	});

	app.post('/editMenuItem', function(req, res) {
		var ings = JSON.parse(req.query.ingredients);
		delete(req.query.ingredients);
		console.log(ings);
		models.MenuItem.update(req.query, {where: {id: req.query.id}}).then(menuItem => {
			console.log(menuItem);
		});

		models.MenuItem_to_Ingredient.findAll({ where: { MenuItem_id: req.query.id } }).then(previous=> {

			// var diff = previous.filter(function(x) { return ings.indexOf(x) < 0 });
			// if(diff.length == 0) {
			// 	console.log("oops");
			// }
			// console.log(diff);
			// for(var i = 0; i < diff.length; i++) {
			// 	models.MenuItem_to_Ingredient.destroy( { where: { MenuItem_id: req.query.id, Ingredient_id: diff[i].id } }).then(function(response) {
			// 		console.log(response);
			// 	})
			// }

			for(var x = 0; x < previous.length; x++) {
				var found = false;
				for(var y = 0; y < ings.length; y++) {
					console.log((previous[x].dataValues.Ingredient_id).toString() + " " + (ings[y].id).toString());
					if(previous[x].dataValues.Ingredient_id == ings[y].id) {
						ings.splice(y,1);
						found = true;
						break;
					}
				}
				if(!found) {
					previous[x].destroy();
				}
			}

			for(var i = 0; i < ings.length; i++) {
				models.MenuItem_to_Ingredient.create({ MenuItem_id: req.query.id, Ingredient_id: ings[i].id } ).then(function(joined) {
					res.send(joined);
				});
			}

		});

	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

}