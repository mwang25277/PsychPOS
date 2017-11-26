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
			type: DataTypes.STRING(25),
			allowNull: false
		},
		serving_size: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		quantity_needed: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		quantity_on_hand: {
			type: DataTypes.INTEGER(11),
			allowNull: true
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
