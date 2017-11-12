/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Employee', {
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
		password: {
			type: DataTypes.STRING(25),
			allowNull: true
		},
		isAdmin: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		}
	}, {
		tableName: 'Employee',
		timestamps: false
	});
};
