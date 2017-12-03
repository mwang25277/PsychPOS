/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Ingredient_to_ModTemp', {
		ingredient_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		modtemp_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		row: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		col: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'Ingredient_to_ModTemp',
		timestamps: false
	});
};
