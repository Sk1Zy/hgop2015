var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function given(userApi) {

  var expected = [{
    "id": "1234",
    "gameId": userApi.cmd.gameId,
    "event": {
      "type": "GameCreated",
      "user": userApi.cmd.user,
    },
    "timeStamp": "2014-12-02T11:29:29"
  }];

  var start = 0;

  var expectApi = {
    withName: function(name) {
      expected[start].name = name;

      return expectApi;
    },
    expect: function(name) {
      expected[start].event = {
      	type: name,
	user: userApi.cmd.user
      }

      return expectApi;
    },
    isOk: function(done) {
      var req = request(acceptanceUrl);
      req
        .post('/api/createGame')
        .type('json')
        .send(userApi.cmd)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          request(acceptanceUrl)
            .get('/api/gameHistory/' + userApi.cmd.gameId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }
              res.body.should.be.instanceof(Array);
              should(res.body).eql(
                expected);
              done();
            });
        });
      return expectApi;
    },
  };

  return expectApi;
}

function userApi(username) {
  var user = {
    cmd: {},
    createGame: function(gameId) {
      user.cmd = {
        id: "1234",
        gameId: gameId,
        comm: "CreateGame",
        user: username,
        timeStamp: "2014-12-02T11:29:29"
      };

      return user;
    },
    withId: function(gameId) {
      user.cmd.gameId = gameId;
      return user;
    }
  };

  return user
}

module.exports.user = userApi;
module.exports.given = given;
