var mongoose 	= require('mongoose')
,	Schema 		= mongoose.Schema
,   db 			= mongoose.connection;

mongoose.connect('mongodb://localhost/palestra', function(err){
	if(err) {
		console.log("Error conectar mongo db: " + err);
	} 
});
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
	
});	