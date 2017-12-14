/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('MenuItem', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		row: {
			type: DataTypes.INTEGER(3),
			allowNull: false
		},
		col: {
			type: DataTypes.INTEGER(3),
			allowNull: false
		},
		category_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'MenuCategory',
				key: 'id'
			}
		},
		color: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		modifier_template_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'ModifierTemplate',
				key: 'id'
			}
		},
		delete_flag: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'MenuItem',
		timestamps: false
	});
};
