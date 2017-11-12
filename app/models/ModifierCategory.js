/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ModifierCategory', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(25),
			allowNull: false
		}
	}, {
		tableName: 'ModifierCategory',
		timestamps: false
	});
};
