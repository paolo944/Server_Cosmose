const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
const port = 8080;

app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
});