const express = require('express');
const app = express();
const port = 80;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/connexion', (req, res) => {
    console.log("J'ai reçu une connexion");
    console.log(req.body.login);
    res.json({connect: true});
})

app.post('/inscription', (req, res) => {
    console.log("J'ai reçu une inscription");
    console.log(req.body);
    res.json({created: true});
})

app.get('/', (req, res) => {
    res.send('');
});

app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
});