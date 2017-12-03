/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Inventory', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		serving_size: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		quantity_needed: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		quantity_on_hand: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		inventory_cat_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'InventoryCategory',
				key: 'id'
			}
		}
	}, {
		tableName: 'Inventory',
		timestamps: false
	});
};
