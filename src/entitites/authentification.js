const express = require('express');
const hash = require('password-hash');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const checkPassword = async (login, password, sessionId, expiresAt) => {
    try{
        const result = await db.collection('users').findOne({login: login});
        if(result){
            if(hash.verify(password, result.password)){
                await db.collection('users').updateOne(
                    { _id: result._id },
                    { $push: { sessions: {sessionId,  expiresAt} } }
                  );
            }
            return true;
        }
        return false;
    }
    catch (error) {
        console.error('Error while checking user existence:', error);
        return false;
    }
}

const auth = express.Router();

auth.post('/', async (req, res) => {
    const sessionId = uuidv4();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // Expires in 48 hours
    if(req.body.login === undefined || req.body.password === undefined){
        res.status(400).json({message: "syntaxe erronée"});
    }
    else if(await checkPassword(req.body.login, req.body.password, sessionId, expiresAt)){
        res.cookie('session_id', sessionId, { httpOnly: true, maxAge: 48 * 60 * 60 * 1000 });
        res.status(200).json({message: "Access Granted"});
    }
    else{
        res.status(401).json({message: "mauvais mot de passe ou login"});
    }
})

module.exports = auth;