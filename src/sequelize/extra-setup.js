function applyExtraSetup(sequelize) {
	const { user, picture } = sequelize.models;

	user.hasMany(picture);
	picture.belongsTo(user);
}

export { applyExtraSetup };