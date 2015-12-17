'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;
var given = require('../fluid-api/tictactoeFluidApi').given;
var user = require('../fluid-api/tictactoeFluidApi').user;

describe('TEST ENV GET /api/gameHistory', function() {

  it('Should have ACCEPTANCE_URL environment variable exported.', function() {
    /*jshint -W030 */
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function(done) {

    var command = {
      id: "1234",
      gameId: "100000",
      comm: "CreateGame",
      user: "Gulli",
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/100000')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1234",
                "gameId": "100000",
                "event": {
                  "type": "GameCreated",
                  "user": "Gulli"
                },
                "timeStamp": "2014-12-02T11:29:29"
              }]);
            done();
          });
      });
  });

  it('Should ', function(done) {
    given(user('Gulli').createsGame('2'))
      .and(user('Grímur').joinsGame('2'))
      .and(user('Gulli').placesMove(1, 1).withId('2').asSide('X'))
      .expect('PlayerPlacedMove').byUser('Gulli').isOk(done);
  });

  it('Game should result in a draw', function(done) {
    given(user('Grimur').createsGame('1'))
      .and(user('Gulli').joinsGame('1'))
      .and(user('Grimur').placesMove(1, 1).withId('1').asSide('X'))
      .and(user('Gulli').placesMove(2, 1).withId('1').asSide('O'))
      .and(user('Grimur').placesMove(2, 2).withId('1').asSide('X'))
      .and(user('Gulli').placesMove(0, 0).withId('1').asSide('O'))
      .and(user('Grimur').placesMove(1, 0).withId('1').asSide('X'))
      .and(user('Gulli').placesMove(1, 2).withId('1').asSide('O'))
      .and(user('Grimur').placesMove(0, 2).withId('1').asSide('X'))
      .and(user('Gulli').placesMove(2, 0).withId('1').asSide('O'))
      .and(user('Grimur').placesMove(0, 1).withId('1').asSide('X'))
      .expect('Draw').byUser('Grimur').isOk(done);
  });

});
