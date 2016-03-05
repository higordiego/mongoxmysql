var mysql = require('mysql');
var async = require('async');
var faker = require('Faker');

var connectionConfig = {
  host: 'localhost',
  database: 'palestra',
  user: 'root',
  password: '',
  debug: false
};

var mysqlDb = {};

mysqlDb.insert = function (dataSize, done) {
  var task = [];
  var connection = mysql.createConnection(connectionConfig);

  task.push(function (callback) {
    connection.connect(function () {
      callback();
    });
  });

  task.push(function (callback) {
    connection.query('CREATE DATABASE IF NOT EXISTS palestra', function () {
      callback();
    });
  });

  task.push(function (callback) {
    connection.query('DROP TABLE usuario', function () {
      callback();
    });
  });

  task.push(function (callback) {
    connection.query('DROP TABLE time', function () {
      callback();
    });
  });


  task.push(function (callback) {
    connection.query('CREATE TABLE IF NOT EXISTS usuario (' +
      'id int(11) NOT NULL AUTO_INCREMENT,' +
      'nome varchar(32) NOT NULL,' +
      'pontuacao int(11) NOT NULL,' +
      'email varchar(64) NOT NULL,' +
      'time int(10) unsigned NOT NULL,' +
      'PRIMARY KEY (id),' +
      'KEY time (time)' +
      ')',

      function () {
        callback();
      });
  });

  task.push(function (callback) {
    connection.query('CREATE TABLE IF NOT EXISTS time (' +
      'id int(11) NOT NULL AUTO_INCREMENT,' +
      'nome varchar(32) NOT NULL,' +
      'pais varchar(32) NOT NULL,' +
      'cidade varchar(32) NOT NULL,' +
      'PRIMARY KEY (id)' +
      ')',

      function () {
        callback();
      });
  });

  for (var i = 0; i < dataSize; i++) {
    task.push(function (callback) {
      connection.query('INSERT INTO usuario (nome, email, time, pontuacao) VALUES (?, ?, ?, ?)', [
        faker.Name.findName(),
        faker.Internet.email(),
        Math.floor(Math.random() * dataSize),
        Math.floor(Math.random() * 1000)
      ], function (err) {
        if (!err) {
          return callback();
        } else {
          console.log('User insert error', err);
        }
      })
    });

    task.push(function (callback) {
      connection.query('INSERT INTO time (nome, pais, cidade) VALUES (?, ?, ?)', [
        faker.Address.city(),
        faker.Address.ukCountry(),
        faker.Company.companyName().split(" ")[0].split(",")[0]
      ], function (err) {
        if (!err) {
          return callback();
        } else {
          console.log('Time insert error', err);
        }
      })
    });
  }

  console.time('mysql insert');

  async.series(task, function () {
    console.timeEnd('mysql insert');
    connection.end();

    if (done) done();
  });
};


mysqlDb.find = function (dataSize, done) {
  var task = [];
  var connection = mysql.createConnection(connectionConfig);

  task.push(function (callback) {
    connection.query('select * from usuario inner join time on usuario.time = time.id', function (data, err) {
      for (var i in data) {
        if (!data[i]['name']) {
          console.log('Mysql error: Team unnamed.');
        }
      }

      return callback();
    })
  });

  console.time('mysql select');
  async.series(task, function () {
    console.timeEnd('mysql select');
    connection.end();

    if (done) done();
  });
};

module.exports = function (type, dataSize, done) {
  return mysqlDb[type](dataSize, done);
};