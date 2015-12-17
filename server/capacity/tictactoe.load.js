var user = require('../fluid-api/tictactoeFluidApi').user;
var given = require('../fluid-api/tictactoeFluidApi').given;

it('Should play 1000 games in x seconds.', function(done) {
  var doneCount = 0;
  var gamesToPlay = 1000;
  var x = 7;

  this.timeout(x * 1000);

  var QED = function() {
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

  for (var gameId = 0; gameId < gamesToPlay; gameId++) {
    given(user('Grimur').createsGame(gameId))
      .and(user('Gulli').joinsGame(gameId))
      .and(user('Grimur').placesMove(0, 1).withId(gameId).asSide('X'))
      .and(user('Gulli').placesMove(0, 0).withId(gameId).asSide('O'))
      .and(user('Grimur').placesMove(1, 1).withId(gameId).asSide('X'))
      .and(user('Gulli').placesMove(0, 2).withId(gameId).asSide('O'))
      .and(user('Grimur').placesMove(2, 2).withId(gameId).asSide('X'))
      .expect("Winner").byUser('Grimur').isOk(QED);
  }
});
