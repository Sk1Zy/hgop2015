var tictactoeState = require('./tictactoeState');

module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];

  var handlers = {
    "CreateGame": function(cmd) {
      {
        return tictactoeState.createGame(cmd);
      }
    },
    "PlayerJoined": function(cmd) {
      {
        if (gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: {
              type: "GameDoesNotExist",
              user: cmd.user,
            },
            timeStamp: cmd.timeStamp
          }];
        }

        return [{
          id: cmd.id,
          event: {
            type: "PlayerJoined",
            user: cmd.user,
            otherUser: gameCreatedEvent.event.user,
          },
          timeStamp: cmd.timeStamp
        }];
      }
    }
  };

  return {
    executeCommand: function(cmd) {
      return handlers[cmd.comm](cmd);
    }
  };
};
