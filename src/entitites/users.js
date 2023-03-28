const express = require('express');
const {MongoClient} = require('mongodb');

const user = express.Router();
user.use(express.json());

user.put('/user', (res, req) => {
    if(req.body.login === undefined || req.body.password === undefined, req.body.firstName === undefined, req.body.lastName === undefined){
        req.status(400).json({message: "paramètres manquants"});
    }
    if(client.findOne({
        login: req.body.login,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }) === null){
        const user = new User({
			...req.body
		});
        const result = await client.insertOne(user);
        req.status(201).json({message: "utilisateur créé", details: ""});
    }else{
        req.status(409).json({message: "utilisateur déjà existant", details: `${req.body.login} est déjà enregistré`});
    }
})

module.exports = user;