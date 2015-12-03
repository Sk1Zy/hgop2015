'use strict';

var _ = require('lodash');

module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent: events[0],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  };

  var handlers = {
    "CreateGame": function(cmd) {
      {
        return [{
          id: cmd.id,
          event: {
            type: "GameCreated",
            user: cmd.user,
          },
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "PlayerJoined": function(cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
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
            otherUser: gameState.gameCreatedEvent.event.user,
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
