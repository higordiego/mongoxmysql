var spinner = require("char-spinner");
var async   = require("async");

var mysql = require('./mysql/mysql');
var mongo = require('./mongo/mongo');

var dataSize = 1000;

spinner();

async.series([
  function (callback) {
    mysql('insert', dataSize, callback);
  },

  function (callback) {
    mysql('find', dataSize, callback);
  },

  function (callback) {
    mongo('insert', dataSize, callback);
  },

  function (callback) {
    mongo('find', dataSize, callback);
  }
], function () {
  process.exit();
});
