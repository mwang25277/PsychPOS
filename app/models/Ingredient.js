/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Ingredient', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		serving_size: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		inventory_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'Inventory',
				key: 'id'
			}
		},
		inventory_cat_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'InventoryCategory',
				key: 'id'
			}
		},
		hasNo: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		noCost: {
			type: DataTypes.FLOAT,
			allowNull: true,
			defaultValue: '0'
		},
		hasExtra: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		extraCost: {
			type: DataTypes.FLOAT,
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'Ingredient',
		timestamps: false
	});
};
