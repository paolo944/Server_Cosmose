const express = require('express');
const hash = require('password-hash');
const db = require('../db');

async function checkUserExists(login){
    try{
        const user = await db.collection('users').findOne({
            login: login
        });
        return !!user;
    } catch (error) {
        console.error('Error while checking user existence:', error);
        return false;
    }
}

async function createUser(login, firstName, lastName, password){
    const userExists = await checkUserExists(login);
    if(userExists){
        return false;
    }
    else{
        const user = {
            login: login,
            firstName: firstName,
            lastName: lastName,
            password: hash.generate(password)
        };
        db.collection('users').insertOne(user);
        return true;
    }
}

const users = express.Router();

users.put('/user', async(req, res) => {
    if(req.body.login === undefined || req.body.password === undefined || req.body.firstName === undefined || req.body.lastName === undefined){
        res.status(400).json({message: "paramètres manquants"});
        console.log('paramètres manquant');
    }
    else if(await createUser(req.body.login, req.body.firstName, req.body.lastName, req.body.password) == true){
        res.status(201).json({message: "utilisateur créé", details: ""});
        console.log('new user');
    }
    else{
        res.status(409).json({message: "utilisateur déjà existant", details: `${req.body.login} est déjà enregistré`});
        console.log('déjà enregistré');
    }
})

module.exports = users;