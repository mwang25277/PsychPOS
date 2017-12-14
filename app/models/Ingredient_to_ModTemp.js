/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Ingredient_to_ModTemp', {
		ingredient_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Ingredient',
				key: 'id'
			}
		},
		modtemp_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'ModifierTemplate',
				key: 'id'
			}
		},
		row: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		col: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		delete_flag: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'Ingredient_to_ModTemp',
		timestamps: false
	});
};
