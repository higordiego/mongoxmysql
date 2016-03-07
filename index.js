var spinner 	= require("char-spinner")
,	 async 		= require("async")
,	 mongo 		= require('./mongo/mongoConexao')
,	 User    	= require('./mongo/user')
,	 Time    	= require('./mongo/times');



spinner();


var dataSize = 100;



async.series([
	function(callback){
		console.log('Teste em MongoDB com tamanho de dados de:'+dataSize);
		callback();
	},
	function(callback){
		require('./mongo/mongo')('insert',dataSize,callback);
	},
	function(callback){

		require('./mongo/mongo')('selectId',dataSize,callback);
	},
	function(callback){

		require('./mongo/mongo')('selectOneCollection',dataSize,callback);
	},

	function(callback){

		require('./mongo/mongo')('selectOneCollectionID',dataSize,callback);
	},

	function(callback){

		require('./mongo/mongo')('updateOneCollection',dataSize,callback);
	},
	function(callback){

		require('./mongo/mongo')('deleteCollectionID',dataSize,callback);
	},
	function(callback){

		require('./mongo/mongo')('find',dataSize,callback);
	},
	function(callback){
		console.log('\n');
		console.log('Teste em Mysql com tamanho de dados de:'+dataSize);
		callback();
	},
	function(callback){
		
		require('./mysql/mysql')('insert',dataSize,callback);
	},
	function(callback){
		
		require('./mysql/mysql')('findOneTable',dataSize,callback);
	},
	function(callback){
		require('./mysql/mysql')('findTableId',dataSize,callback);
	},
	function(callback){
		require('./mysql/mysql')('oneUpadeTable',dataSize,callback);
	},
	function(callback){
		require('./mysql/mysql')('oneDeleteTable',dataSize,callback);
	},
	function(callback){
		require('./mysql/mysql')('findInnerJoin',dataSize,callback);
	}
	],function(){
		process.exit();
	})

	
