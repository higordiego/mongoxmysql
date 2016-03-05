var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;
var db 				= mongoose.connection;
var ObjectId 	= mongoose.Schema.Types.ObjectId;

var async   = require('async');
var faker   = require('Faker');
var mongoDb = {};


mongoose.connect('mongodb://localhost/palestra', function (err) {
  if (err) {
    console.log("Error conectar mongodb: " + err);
  }
});

db.on('error', console.error.bind(console, 'Connection error:'));


var UserSchema = new Schema({
  nome: { type: String },
  email: { type: String },
  pontuacao: { type: String }
});

var TimeSchema = new Schema({
  usuario: { type: ObjectId, ref: 'User' },
  nome: { type: String },
  pais: { type: String },
  cidade: { type: String }
});

var User = mongoose.model('User', UserSchema);

var Time = mongoose.model('Time', TimeSchema);


mongoDb.insert = function (dataSize, done) {
  var task = [];

  task.push(function (callback) {
    User.remove(callback);
  });

  task.push(function (callback) {
    Time.remove(callback);
  });

  for (var i = 0; i < dataSize; i++) {

    task.push(function (callback) {
      var user = new User();
      var time = new Time();

      time.usuario = user._id;
      time.cidade = faker.Address.city();
      time.pais = faker.Address.ukCountry();
      time.nome = faker.Company.companyName().split(" ")[0].split(",")[0];

      user.nome = faker.Name.findName();
      user.email = faker.Internet.email();
      user.pontuacao = Math.floor(Math.random() * 1000);

      user.save(function (err) {
        if (!err) {
          time.save(callback);
        }
      });
    });

  }

  console.time('mongo insert');

  async.series(task, function () {
    console.timeEnd('mongo insert');
    if (done) done();
  });
};


mongoDb.find = function (dataSize, done) {
  var task = [];

  task.push(function (callback) {
    Time
      .find()
      .populate('usuario')
      .exec(callback);
  });

  console.time('mongo select');

  async.series(task, function () {
    console.timeEnd('mongo select');
    if (done) done();
  });
};


module.exports = function (type, dataSize, done) {
  return mongoDb[type](dataSize, done);
};