/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('MenuItem_to_Ingredient', {
		MenuItem_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'MenuItem',
				key: 'id'
			}
		},
		Ingredient_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Ingredient',
				key: 'id'
			}
		}
	}, {
		tableName: 'MenuItem_to_Ingredient',
		timestamps: false
	});
};
