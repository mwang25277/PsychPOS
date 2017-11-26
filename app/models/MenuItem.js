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
		hasNo: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		hasExtra: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		row: {
			type: DataTypes.INTEGER(3),
			allowNull: true
		},
		col: {
			type: DataTypes.INTEGER(3),
			allowNull: true
		},
		category: {
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
		}
	}, {
		tableName: 'MenuItem',
		timestamps: false
	});
};
