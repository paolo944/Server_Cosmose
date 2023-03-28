const express = require('express');
const {MongoClient} = require('mongodb');
const Users = require('./entitites/users');
const Auth = require('./entitites/authentification');
const Msg = require('./entitites/messages');

const api = express.Router();

async function main(){
    const uri = "mongodb+srv://alolop_ovh:UkfvG2T00w6innQQ@cosmose.6pydv0w.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
		console.log("Base de donnée connecté !");
        api.use('/users', Users);
		api.use('authentification', Auth);
		api.use('messages', Msg);
    } catch(e) {
        console.error(e);
		api.use('', (res, req) => {
			res.status(504).json({message: "server not connected error"});
		})
    } finally {
        await client.close();
    }
}

main().catch(console.error);

/*app.post('/connexion', (req, res) => {
	let existe = User.findOne({login: req.body.login}).exec();
	console.log(existe);
   /*if( === null){
		res.status(400).json({connected: false, error: "Utilisateur non existant"});
	}else{
		res.status(200).json({connect: true});
	}
})

app.post('/inscription', (req, res) => {
	if(User.exists({login: req.body.login}) != null){
		res.status(400).json({created: false, error: "Utilisateur existant"});
	}else{
		const user = new User({
			...req.body
		});
		user.save()
			.then(() => res.status(201).json({created: true}))
			.catch(error => res.status(400).json({created: false, error: error}));
	}
})*/

module.exports = api;