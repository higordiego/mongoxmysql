var mysql      = require('mysql');
var async 	   = require('async');
var faker 	   = require('Faker');


var metodo = {};

metodo.insert = function(dataSize,done){
	var array = [];
	var conexao      =    mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'palestra',
		debug    :  false
	});
	array.push(function(callback){
		conexao.connect(function(err){
			callback();
		});
	})

	array.push(function(callback){
		conexao.query('CREATE DATABASE IF NOT EXISTS palestra',function(data,err){
			callback();
		});
	})

	array.push(function(callback){
		conexao.query('DROP TABLE usuario',function(data,err){
			callback();
		});
	});

	array.push(function(callback){
		conexao.query('DROP TABLE time',function(data,err){
			callback();
		});
	});


	array.push(function(callback){
		conexao.query('CREATE TABLE IF NOT EXISTS usuario ('+
			'id int(11) NOT NULL AUTO_INCREMENT,'+
			'nome varchar(32) NOT NULL,'+
			'pontuacao int(11) NOT NULL,'+
			'email varchar(64) NOT NULL,'+
			'time int(10) unsigned NOT NULL,'+
			'PRIMARY KEY (id),'+
			'KEY time (time)'+
			')',function(data,err){
				callback();
			});
	});

	array.push(function(callback){
		conexao.query('CREATE TABLE IF NOT EXISTS time ('+
			'id int(11) NOT NULL AUTO_INCREMENT,'+
			'nome varchar(32) NOT NULL,'+
			'pais varchar(32) NOT NULL,'+
			'cidade varchar(32) NOT NULL,'+
			'PRIMARY KEY (id)'+
			')',function(data,err){
				callback();
			});
	});


	var dataSize = 1000;
	for(var i=0;i<dataSize;i++){
		array.push(function(callback){
			conexao.query('insert into usuario (nome,email,time,pontuacao) values (?,?,?,?)',[faker.Name.findName(),faker.Internet.email(),
				Math.floor(Math.random()*dataSize), Math.floor(Math.random()*1000) ],function(err, rows, fields){
					if(!err){
						return callback();	
					}else{
						console.log('erro na inserção',err);
					}

				})
		});
		array.push(function(callback){
			conexao.query('insert into time (nome,pais,cidade) values (?,?,?)',[faker.Address.city(),faker.Address.ukCountry(),
				faker.Company.companyName().split(" ")[0].split(",")[0]],function(err, rows, fields){
					if(!err){
						return callback();	
					}else{
						console.log('erro na inserção',err);
					}

				})
		});
	}

	console.time('mysql insert')
	async.series(array,function(err,data){
		console.timeEnd('mysql insert');
		conexao.end();
		if(done) done();
	});
}

metodo.find = function(dataSize,done){
	var array = [];
	var conexao      =    mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'palestra',
		debug    :  false
	});
	array.push(function(callback){
		conexao.query('select * from usuario inner join time on usuario.time = time.id', function(data,err){
			// for(var i in data) console.log(data[i]['player']+" : "+data[i]['name'])
			for(var i in data) if(!data[i]['name']) console.log('mysql error : team no name');
				callback();
		})
	});
	console.time('mysql select')
	async.series(array,function(err,data){
		console.timeEnd('mysql select');
		conexao.end();
		if(done) done();
	});
}

module.exports = function(type,dataSize,done){
	return metodo[type](dataSize,done);
}


