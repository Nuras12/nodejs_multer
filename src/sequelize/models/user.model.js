const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = function(sequelize) {

	var User = sequelize.define('user', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			username: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: true,
				validate: {
					is: /^\w{3,}$/
				}
			},
			password: DataTypes.STRING
		}, {
			tableName: 'users',
			freezeTableName: true,
			hooks: {
				beforeCreate: (user) => {
				const salt = bcrypt.genSaltSync(8);
				user.password = bcrypt.hashSync(user.password, salt);
				}
			},

		});


	User.prototype.validPassword = async function(password) {
		return await bcrypt.compare(password, this.password);
	}

	return User;
}