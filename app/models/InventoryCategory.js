/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('InventoryCategory', {
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
		delete_flag: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'InventoryCategory',
		timestamps: false
	});
};
