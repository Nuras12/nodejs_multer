import Sequelize from 'sequelize';

export const Picture = (sequelize) => {
	sequelize.define('picture', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.DataTypes.INTEGER
		},
		path: {
			allowNull: false,
			type: Sequelize.DataTypes.STRING
		},
		filename: {
			allowNull: false,
			type: Sequelize.DataTypes.STRING	
		}
	}, {
		tableName: 'pictures'
	});
};