var spinner = require("char-spinner");
var async = require("async");
spinner();

var dataSize = 1000;


async.series([

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
	}
	
	// function(callback){
		
	// 	require('./mysql/mysql')('selectOneTable',dataSize,callback);
	// },
	// function(callback){
		
	// 	require('./mongo/mongo')('selectOneTable',dataSize,callback);
	// },

	
	// function(callback){

	// 	require('./mysql/mysql')('find',dataSize,callback);
	// },
	
	// function(callback){
		
	// 	require('./mongo/mongo')('insert',dataSize,callback);
	// },	
	// function(callback){
		
	// 	require('./mongo/mongo')('find',dataSize,callback);
	// }
	],function(){
		process.exit();
	})
