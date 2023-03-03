const express = require('express');
//const mongoose = require('mongoose');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8080;

/*mongoose.connect('mongodb+srv://alolop_ovh:UkfvG2T00w6innQQ@cosmose.6pydv0w.mongodb.net/?retryWrites=true&w=majority', 
	{ useNewUrlParser: true,
	  useUnifiedTopology: true})
	.then(() => console.log('Connexion à Mongodb réussie !'))
	.catch((error) => console.log(error)); */

let db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("connecté à la base de données sql");
		db.run(`CREATE TABLE users (
			nom varchar(20) not null,
			prenom varchar(20) not null,
			login varchar(20) not null,
			mdp varchar(64) not null
			)
		`);
	});

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
	db.run(`INSERT INTO users values (${req.body.nom}, ${req.body.prenom}, ${req.body.login}, ${req.body.mdp})`,
	function(err) {
		if(err){
			res.status(400).json({err});
		}
	res.status(201).json({created: true});
	}
	)
})

app.get('/', (req, res) => {
    res.send('Coucou visiteur');
});

app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
});

db.close((err) => {
	if(err) {
		return console.error(err.message)
	}
	console.log('Fermeture de la connexion à la base de données');	
});

