const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

mongoose.connect('mongodb+srv://alolop_ovh:IVCxFJusVqioqfBK@cosmose.6pydv0w.mongodb.net/?retryWrites=true&w=majority', 
	{userNewUrlParser: true,
	userUnifiedTopology: true})
	.then(() => console.log('Connexion à Mongodb réussie !'))
	.catch((error) => console.log(error)); 

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/connexion', (req, res) => {
    console.log(req.body);
    res.json({connect: true});
})

app.post('/inscription', (req, res) => {
    console.log(req.body);
    res.json({created: true});
})

app.get('/', (req, res) => {
    res.send('Coucou visiteur');
});

app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
});
