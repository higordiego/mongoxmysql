var mongoose 	= require('mongoose')
,	Schema = mongoose.Schema
,   ObjectId = mongoose.Schema.Types.ObjectId;

var user = new Schema({
	nome: 			{ type: String},
	email: 			{ type: String},
	pontuacao: 		{ type: String}
});
var User = mongoose.model('User', user);

module.exports = User;