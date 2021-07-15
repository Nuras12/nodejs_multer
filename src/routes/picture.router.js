const express = require('express');
const path = require('path');
const fs = require('fs')

const dao = require('../sequelize/index');
const multer  = require('multer')


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../", '/uploads'));
    },
    filename: (req, file, cb) =>{
        cb(null, (new Date()).toISOString() + '_' + file.originalname)
    }
});

const upload = multer({ storage: storageConfig });


const router = express.Router();


router.get('/', async function (req, res) {
    try {
        const user = await dao.User.findOne(req.username);
        const pictures = await dao.Picture.findAll(user.id);

        res.status(200).json({ data: pictures });
    } catch(err) {
        res.status(500).json({ error: 'Internal error please try again' });
    }
});

router.get('/:id', async function (req, res) {
    try {
        const picture = await dao.Picture.findById(req.params.id);

        if (!picture){
            res.status(404).json({ error: "not found" });
        } else {
            const file = fs.createReadStream(picture.path);
            const filename = (new Date()).toISOString();
            res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"');
            file.pipe(res);
        }

    } catch(err) {
        res.status(500).json({ error: 'Internal error please try again' });
    }
});

router.post('/', upload.any(), async function (req, res) {
    try {
        for (pic of req.files){
            const user = await dao.User.findOne(req.username);
            await dao.Picture.create(user.id, pic.originalname, pic.path);
        }

        res.sendStatus(201);

    } catch(err) {
        res.status(500).json({ error: 'Internal error please try again' });
    }
});


module.exports = router;
