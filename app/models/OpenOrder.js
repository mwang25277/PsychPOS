/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('OpenOrder', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		payment_type: {
			type: DataTypes.STRING(11),
			allowNull: false
		},
		Employee_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'Employee',
				key: 'id'
			}
		}
	}, {
		tableName: 'OpenOrder',
		timestamps: false
	});
};
