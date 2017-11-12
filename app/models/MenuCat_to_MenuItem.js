/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('MenuCat_to_MenuItem', {
		Menu_Cat_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'MenuCategory',
				key: 'id'
			}
		},
		Menu_Item_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'MenuItem',
				key: 'id'
			}
		}
	}, {
		tableName: 'MenuCat_to_MenuItem',
		timestamps: false
	});
};
