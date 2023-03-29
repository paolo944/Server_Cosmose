const hash = require('password-hash');

function createUser(client, login, firstName, lastName, password){
    if(client.findOne({
        login: login,
        firstName: firstName,
        lastName: lastName
    }) === null){
        const user = new User({
            login: login,
            firstName: firstName,
            lastName: lastName,
            password: hash.generate(password)
        });
        client.insertOne(user);
        return true;
    }else{
        return false;
    }
}


function user(client, res, req){
    if(req.method === "PUT"){
        if(req.body.login === undefined || req.body.password === undefined || req.body.firstName === undefined || req.body.lastName === undefined){
            res.status(400).json({message: "paramètres manquants"});
        }
        if(createUser(client, req.body.login, req.body.firstName, req.body.lastName)){
            res.status(201).json({message: "utilisateur créé", details: ""});
        }
       else{
            res.status(409).json({message: "utilisateur déjà existant", details: `${req.body.login} est déjà enregistré`});
        }
    }
}

module.exports = user;