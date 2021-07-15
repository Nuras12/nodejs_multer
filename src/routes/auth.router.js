const express = require('express');
const jwt = require('jsonwebtoken');
const dao = require('../sequelize/index');
const withAuth = require('../middleware/auth');

const secret = 'secret_uHNn2kTDpB';

const router = express.Router();

router.post('/register', async function (req, res) {
    try {
        const { username, password } = req.body;
        const user = await dao.User.create(username, password);
        
        res.status(200).send("User registered successfully!");
    } catch(e) {
        res.status(500).send("Error registering new user! Please try again!");
    }
});

router.post('/login', async function (req, res) {
    try {
        const { username, password } = req.body;
        const user = await dao.User.findOne(username);

        if (!user){
            res.status(401).json({ error: 'Incorrect username or password' });
        } else if (! await user.validPassword(password)) {
            res.status(401).json({ error: 'Incorrect username or password' });
        } else {
            const token = jwt.sign({ username }, secret, { expiresIn: '24h' });
            res.cookie('token', token, { httpOnly: true, sameSite: true }).status(200).send(token);
        }

    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Internal error please try again' });
    }
});

router.get('/logout', function (req, res) {
    res.clearCookie("token").sendStatus(200);
});

router.get('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});


module.exports = router;
