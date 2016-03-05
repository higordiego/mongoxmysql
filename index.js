var spinner = require("char-spinner");
var async = require("async");
spinner();

var dataSize = 1000;


async.series([
	
	function(callback){
		
		require('./mysql/mysql')('insert',dataSize,callback);
	},
	
	function(callback){

		require('./mysql/mysql')('find',dataSize,callback);
	},
	
	function(callback){
		
		require('./mongo/mongo')('insert',dataSize,callback);
	},	
	function(callback){
		
		require('./mongo/mongo')('find',dataSize,callback);
	}
],function(){
	process.exit();
})
