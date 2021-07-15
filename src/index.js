const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const dao = require('./sequelize');
const withAuth = require('./middleware/auth');

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await dao.sequelize.authenticate();
        await dao.sequelize.sync();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	const app = express();
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    app.use('/auth', require('./routes/auth.router.js'));    
    app.use('/pictures', withAuth, require('./routes/picture.router.js'));    

	app.listen(8080, () => {
		console.log(`Express server started on port. Try some routes, such as '/api/pictures'.`);
	});
}

init();