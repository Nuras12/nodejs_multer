const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('picture', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		path: {
			allowNull: false,
			type: DataTypes.STRING
		},
		filename: {
			allowNull: false,
			type: DataTypes.STRING	
		}
	}, {
		tableName: 'pictures'
	});
};