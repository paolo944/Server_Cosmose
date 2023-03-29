function userExists(login){

}

function checkPassword(password){
    
}

function auth(client, res, req){
    if(req.method === "POST"){
        if(req.body.login === undefined || req.body.password === undefined){
            res.status(400).json({message: "syntaxe erronée"});
        }
        if(userExists(req.body.login)){
            if(checkPassword(login, password)){
                res.status(200).json({message: "Access Granted"});
            }
        }else{
            res.status(401).json({message: "mauvais mot de passe ou login"});
        }
    }
}

module.exports = auth;