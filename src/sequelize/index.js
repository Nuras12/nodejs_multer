const dotenv = require("dotenv");
const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

dotenv.config();

const {
    PG_USERNAME,
    PG_PASSWORD,
    PG_HOST,
    PG_PORT,
    PG_DB_NAME
} = process.env;

const url = `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB_NAME}`;
const sequelize = new Sequelize(url);


const modelDefiners = [
	require('./models/user.model'),
	require('./models/picture.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

const DAO = {};
DAO.sequelize = sequelize;

DAO.User = {
    create: async (username, password) => {
        return await sequelize.models.user.create({ username, password });
    },
	findOne: async (username) => await sequelize.models.user.findOne({ where: { username } }) 
}

DAO.Picture = {
    create: async (userId, filename, path) => {
        return await sequelize.models.picture.create({ userId, filename, path });
    },
	findById: async (id) => await sequelize.models.picture.findOne({ where: { id } }), 
	findAll: async (userId) => await sequelize.models.picture.findAll({ 
        where: { userId }, 
        attributes: {exclude: ['userId', 'path']}
    }) 
}

module.exports = DAO;