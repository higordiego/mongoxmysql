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



var id;
metodo.selectId  = function(dataSize,done){
	var array = [];

	array.push(function(callback){
		Time.findOne({},function(err,time){
			id = time._id;
			callback();
		});	
	});
	async.series(array,function(err,data){
		if(done) done();
	});

}

metodo.selectOneCollection = function(dataSize,done){
	var array = [];
	array.push(function(callback){
		Time.find({},callback);	
	})

	console.time('Mongo Select 1 Collection');

	async.series(array,function(err,data){
		console.timeEnd('Mongo Select 1 Collection');
		if(done) done();
	});
	
}



metodo.selectOneCollectionID = function(dataSize,done){
	var array = []
	array.push(function(callback){
		Time.find({_id: id},callback);
	})
	console.time('Mongo Select One Collection Busca por ID');

	async.series(array,function(err,data){
		console.timeEnd('Mongo Select One Collection Busca por ID');
		if(done) done();
	});
	
}


metodo.updateOneCollection = function(dataSize,done){
	var array = [];
	array.push(function(callback){
		var time = new Time();
		console.time('Mongo Update 1 Documento');

		time.update({_id: id},{$set:{ cidade:faker.Address.city(),
			pais:  faker.Address.ukCountry(), 
			nome: faker.Company.companyName().split(" ")[0].split(",")[0]}},callback);
	})
	async.series(array,function(err,data){
		console.timeEnd('Mongo Update 1 Documento');
		if(done) done();
	}); 		
}


metodo.deleteCollectionID  = function(dataSize,done){
	var array = [];

	array.push(function(callback){
		Time.remove({_id: id},callback);	
	});
	console.time('Mongo Removendo 1 Documento');

	async.series(array,function(err,data){
		console.timeEnd('Mongo Removendo 1 Documento');
		if(done) done();
	});

}

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

	console.time('Mongo Insert 2 Collection');

	async.series(array,function(err,data){
		console.timeEnd('Mongo Insert 2 Collection');
		if(done) done();
	});
}

metodo.find = function(dataSize,done){
	console.time('Mongo 2 Collection Function Populate');
	var array =[];
	array.push(function(callback){
		Time
		.find({})
		.populate('usuario')
		.exec({},callback);
	});

	async.series(array,function(err,data){
		console.timeEnd('Mongo 2 Collection Function Populate');
		if(done) done();
	});

}


module.exports = function(type,dataSize,done){
	return metodo[type](dataSize,done);
}

