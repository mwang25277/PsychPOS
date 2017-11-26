/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('MenuCategory', {
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
		row: {
			type: DataTypes.INTEGER(3),
			allowNull: true
		},
		col: {
			type: DataTypes.INTEGER(3),
			allowNull: true
		},
		color: {
			type: DataTypes.STRING(45),
			allowNull: true
		}
	}, {
		tableName: 'MenuCategory',
		timestamps: false
	});
};
