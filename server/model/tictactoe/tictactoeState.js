'use strict';

module.exports = function() {
  var games = {};

  return {
    createGame: function(command) {
      // If there is already a game with this ID.
      if(games[command.id]) {
        return {
          id: command.id,
          event: {
            type: "GameAlreadyExists"
          }
        }
      }

      games[command.id] = {
        name: command.name,
        player1: command.user,
        player2: null,
        started: false
      }

      return [{
        id: command.id,
        event: {
          type: "GameCreated",
          user: command.user
        },
        timeStamp: command.timeStamp,
      }]
    }
  }
}();
