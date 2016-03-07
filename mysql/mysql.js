var mysql      = require('mysql');
var async 	   = require('async');
var faker 	   = require('Faker');


var metodo = {};
var conexao      =    mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'i190f200r', // Senha do
	database : 'palestra',
	debug    :  false
});

metodo.selectOneTable = function(dataSize, done){
	var array = [];
	
	array.push(function(callback){
		conexao.connect(function(err){
			callback();
		});
	})
	array.push(function(callback){
		conexao.query('select * from time',function(err, rows, fields){
			if(!err){
				return callback();	
			}else{
				console.log('erro na busca',err);
			}

		})
	});
	console.time('Mysql select One Table')
	async.series(array,function(err,data){
		console.timeEnd('Mysql select One Table');
		
		if(done) done();
	});

}

metodo.insert = function(dataSize,done){
	var array = [];
	
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

	console.time('Mysql Insert 2 Tabelas')
	async.series(array,function(err,data){
		console.timeEnd('Mysql Insert 2 Tabelas')
		
		if(done) done();
	});
}

metodo.findInnerJoin = function(dataSize,done){
	var array = [];
	array.push(function(callback){
		conexao.query('select * from usuario inner join time on usuario.time = time.id', function(err,data){
			// for(var i in data) console.log(data[i]['player']+" : "+data[i]['name'])
			for(var i in data) if(!data[i]['nome']) console.log('mysql error : team no name');
				callback();
		})
	});
	console.time('Mysql Select Inner Join Duas Tables')
	async.series(array,function(err,data){
		console.timeEnd('Mysql Select Inner Join Duas Tables')
		
		if(done) done();
	});
}

metodo.findOneTable = function(datasize,done){
	var array = [];

	array.push(function(callback){
		conexao.query('select * from usuario;', function(err,data){
			for(var i in data) if(!data[i]['nome']) console.log('mysql error : time no nome');
				callback();
		});
	});
	console.time('Mysql Select 1 Tabela')
	async.series(array,function(err,data){
		console.timeEnd('Mysql Select 1 Tabela')
		
		if(done) done();
	});

}


metodo.findTableId = function(datasize,done){
	var array = [];
	
	array.push(function(callback){
		conexao.query('select * from usuario where id = 1;', function(err,data){
			for(var i in data) if(!data[i]['nome']) console.log('mysql error : time no nome');
				callback();
		});
	});
	console.time('Mysql Select 1 Tabela por id')
	async.series(array,function(err,data){
		console.timeEnd('Mysql Select 1 Tabela por id')
		
		if(done) done();
	});

}


metodo.oneUpadeTable = function(datasize,done){
	var array = [];
	
	array.push(function(callback){
		conexao.query('update time set nome=?,pais=?,cidade=? where id = 1;',[faker.Address.city(),faker.Address.ukCountry(),
			faker.Company.companyName().split(" ")[0].split(",")[0]],function(err, rows, fields){
				if(!err){
					return callback();	
				}else{
					console.log('erro na inserção',err);
				}

			})
	});
	console.time('Mysql Update 1 Tabela')
	async.series(array,function(err,data){
		console.timeEnd('Mysql Update 1 Tabela')
		
		if(done) done();
	});

}

metodo.oneDeleteTable = function(datasize,done){
	var array = [];
	
	array.push(function(callback){
		conexao.query('delete from  time where id = 1;',function(err, rows, fields){
			if(!err){
				return callback();	
			}else{
				console.log('erro na inserção',err);
			}
		});
	});
	console.time('Mysql Delete 1 linha da Tabela')
	async.series(array,function(err,data){
		console.timeEnd('Mysql Delete 1 linha da Tabela')
		conexao.end();
		if(done) done();
	});

}





module.exports = function(type,dataSize,done){
	return metodo[type](dataSize,done);
}


