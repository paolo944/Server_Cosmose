const path = require("path");
const express = require('express');
const api = require('./api');

const router = express.Router();
router.use(express.static(path.resolve(__dirname, "../../Cosmose")));
router.use(express.static("public"));

router.use(express.urlencoded({extended: true}))
.use(express.json());

router.use('/api', api);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "Cosmose", "build", "index.html"));
});

module.exports = router;