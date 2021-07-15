import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

export const User = function(sequelize) {

	const User = sequelize.define('user', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.DataTypes.INTEGER
		},
		username: {
			allowNull: false,
			type: Sequelize.DataTypes.STRING,
			unique: true,
			validate: {
				is: /^\w{3,}$/
			}
		},
		password: Sequelize.DataTypes.STRING }, {
			tableName: 'users',
			freezeTableName: true,
			hooks: {
				beforeCreate: (user) => {
					const salt = bcrypt.genSaltSync(8);
					user.password = bcrypt.hashSync(user.password, salt);
				}
			}
		});

	User.prototype.validPassword = async function(password) {
		return await bcrypt.compare(password, this.password);
	}

	return User;
}