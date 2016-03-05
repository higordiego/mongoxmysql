var mongoose = require('mongoose')
,	Schema = mongoose.Schema
,   db = mongoose.connection
,   ObjectId = mongoose.Schema.Types.ObjectId
,	async 	   = require('async')
,   faker 	   = require('Faker');

mongoose.connect('mongodb://localhost/palestra', function(err){
	if(err) {
		console.log("Error conectar mongo db: " + err);
	} 
});
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
	
});	

var user = new Schema({
	nome: 			{ type: String},
	email: 			{ type: String},
	pontuacao: 		{ type: String}
});
var User = mongoose.model('User', user);

var time = new Schema({
	usuario: 		{ type: ObjectId, ref: 'User'},
	nome: 			{ type: String},
	pais: 			{ type: String},
	cidade: 		{ type: String}
});

var Time = mongoose.model('Time', time);

var metodo = {};

metodo.insert = function(dataSize,done){
	var array = [];

	array.push(function(callback){
		User.remove({},callback);
	})

	array.push(function(callback){
		Time.remove({},callback);
	})

	for(var i=0;i<dataSize;i++){
		array.push(function(callback){
			var user = new User();
			var time = new Time();
			time.usuario = user._id;
			time.cidade = faker.Address.city(),
			time.pais = faker.Address.ukCountry(),
			time.nome = faker.Company.companyName().split(" ")[0].split(",")[0]
			user.nome = faker.Name.findName();
			user.email = faker.Internet.email();
			user.pontuacao = Math.floor(Math.random()*1000);
			user.save({},function(err){
				if(!err){
					time.save({},callback);
				}
			});

		});

	}

	console.time('mongo insert');

	async.series(array,function(err,data){
		console.timeEnd('mongo insert');
		if(done) done();
	});
}

metodo.find = function(dataSize,done){
	console.time('mongo select');
	var array =[];
	array.push(function(callback){
		Time
		.find({})
		.populate('usuario')
		.exec({},callback);
	});
	
	async.series(array,function(err,data){
		console.timeEnd('mongo select');
		if(done) done();
	});

}


module.exports = function(type,dataSize,done){
	return metodo[type](dataSize,done);
}

