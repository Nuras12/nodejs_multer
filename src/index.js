import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import dao from './sequelize/index.js';
import { withAuth } from './middleware/auth.js';
import authRouter from './routes/auth.router.js';
import pictureRouter from './routes/picture.router.js';

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
    
    app.use('/auth', authRouter);    
    app.use('/pictures', withAuth, pictureRouter);    

	app.listen(8080, () => {
		console.log(`Express server started on port. Try some routes, such as '/api/pictures'.`);
	});
}

init();