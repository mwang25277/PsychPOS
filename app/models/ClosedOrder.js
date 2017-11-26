/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ClosedOrder', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		itemsOrdered: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		ingredientsAdded: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		price: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		payment_type: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		discounts: {
			type: DataTypes.STRING(45),
			allowNull: true
		}
	}, {
		tableName: 'ClosedOrder',
		timestamps: false
	});
};
