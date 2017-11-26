/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Discount', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		amount: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
	}, {
		tableName: 'Discount',
		timestamps: false
	});
};
