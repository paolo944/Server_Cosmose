const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const {validateSession} = require('./session');
const api = require('./api');

const router = express.Router();

router.use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cookieParser())
    .use(express.static(path.join(__dirname, '../../Cosmose/build'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}))
.use(validateSession) // Ajoutez le middleware validateSession ici
.use('/api', api);

router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../Cosmose/build/index.html"), {
        isAuthenticated: req.isAuthenticated,
    });
});

module.exports = router;
