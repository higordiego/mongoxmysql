var mongoose 	= require('mongoose')
,	Schema = mongoose.Schema
,   ObjectId = mongoose.Schema.Types.ObjectId;


var time = new Schema({
	usuario: 		{ type: ObjectId, ref: 'User'},
	nome: 			{ type: String},
	pais: 			{ type: String},
	cidade: 		{ type: String}
});

var Time = mongoose.model('Time', time);

module.exports = Time;