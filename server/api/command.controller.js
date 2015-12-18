'use strict';

var _ = require('lodash');
var boundedContext = require('../model/tictactoe/tictactoeBoundedContext');
var tictactoeHandler = require('../model/tictactoe/tictactoeCommandHandler');

var app = require('../app');

module.exports = function(store) {
  return {
    executeCommand: function(req, res) {
      try {
        var context = boundedContext(store, tictactoeHandler);
        context.handleCommand(req.body).then(function(result) {
          console.log('results', result);
          res.json(result);
        }, function(err) {
          console.warn(err);
          res.json(err);
        });
      } catch (e) {
        res.json(e)
      }
    }
  };
};
