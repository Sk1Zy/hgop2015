var should = require('should');
var request = require('supertest');
var async = require('async');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var position = 0;

function commandBuilder(cmd) {
  var command = {
    id: position,
    comm: cmd.comm,
    userName: cmd.userName,
    gameId: cmd.gameId,
    timeStamp: new Date().toString()
  };
  if (cmd.comm === 'PlayerPlacedMove') {
    command.x = cmd.x;
    command.y = cmd.y;
    command.side = cmd.side;
  }
  position++;
  return command;
}

function given(userApi) {
  var expected = [];
  var commands = userApi.commands;
  var expectApi = {
    expect: function(eventName) {
      expected.push({
        event: eventName
      });
      return expectApi;
    },
    and: function(event) {
      commands = userApi.commands.concat(event.commands);
      return expectApi;
    },
    byUser: function(userName) {
      expected[expected.length - 1].user = userName;
      return expectApi;
    },
    isOk: function(done) {
      async.eachSeries(commands, function(command, callback) {
        var url;
        if (command.comm === 'PlayerPlacedMove') {
          url = '/api/placeMove';
        } else if (command.comm === 'PlayerJoined') {
          url = '/api/joinGame';
        } else if (command.comm === 'CreateGame') {
          url = '/api/createGame';
        }

        command = commandBuilder(command);

        request(acceptanceUrl)
          .post(url)
          .type('json')
          .send(command)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            
            res.body.should.be.instanceof(Array);
            callback();
          });
      }, function() {
        var gameId = commands[0].gameId;
        request(acceptanceUrl)
          .get('/api/gameHistory/' + gameId)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(done);
      });
    }
  };

  return expectApi;
}

function user(userName) {
  var userApi = {
    commands: [],
    createsGame: function(gameId) {
      userApi.commands.push({
        gameId: gameId,
        comm: 'CreateGame',
        user: userName
      });
      return userApi;
    },
    joinsGame: function(gameId) {
      userApi.commands.push({
        gameId: gameId,
        comm: 'PlayerJoined',
        user: userName
      });
      return userApi;
    },
    placesMove: function(x, y) {
      userApi.commands.push({
        comm: 'PlayerPlacedMove',
        user: userName,
        x: x,
        y: y
      });
      return userApi;
    },
    asSide: function(side) {
      userApi.commands[userApi.commands.length - 1].side = side;
      return userApi;
    },
    withId: function(gameId) {
      userApi.commands[userApi.commands.length - 1].gameId = gameId;
      return userApi;
    }
  };
  return userApi
}

module.exports.user = user;
module.exports.given = given;
