/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ModCat_to_Inv', {
		Mod_Cat_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'ModifierCategory',
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
		tableName: 'ModCat_to_Inv',
		timestamps: false
	});
};
