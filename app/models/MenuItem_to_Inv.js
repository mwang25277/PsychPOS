/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('MenuItem_to_Inv', {
		MenuItem_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'MenuItem',
				key: 'id'
			}
		},
		Inv_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Inventory',
				key: 'id'
			}
		}
	}, {
		tableName: 'MenuItem_to_Inv',
		timestamps: false
	});
};
