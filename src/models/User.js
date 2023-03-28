const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    login: {type: String, required: true},
    nom: {type: String, required: true},
})

module.exports = mongoose.model('User', UserSchema);