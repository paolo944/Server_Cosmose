const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: {type: Number,required true},
	login: {type: String, required true},
	nom: {type: String, required: true},
	prenom: {type: String, required: true},
	mdp: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
