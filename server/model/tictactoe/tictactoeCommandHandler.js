'use strict';

var _ = require('lodash');

module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent: events[0],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    isOver: function() {
      var self = this;
      if(self.board[0][0] === self.board[1][1] &&  self.board[1][1] === self.board[2][2]) {
        return true;
      }

      if(self.board[0][2] === self.board[1][1] && self.board[1][1] === self.board[2][0]) {
        return true;
      }

      for(var i = 0; i < self.board.length; ++i) {
        if(self.board[i][0] === self.board[i][1] && self.board[i][1] === self.board[i][2]) {
          return true;
        }

        if(self.board[0][i] === self.board[1][i] && self.board[1][i] === self.board[2][i]) {
          return true;
        }
      }

      return false;
    },
    isDraw: function() {
      var self = this;

      for(var i = 0; i < self.board.length; ++i) {
        for(var n = 0; n < self.board[i].length; ++n) {
          if(!self.board[i][n]) {
            return false
          }
        }
      }

      return true;
    }
  };

  _.forEach(events, function(event) {
    if(event.event.type === "PlayerPlacedMove") {
      gameState.board[event.event.x][event.event.y] = event.event.side;
    }
  })

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
    },
    "PlayerPlacedMove": function(cmd) {
      if(gameState.board[cmd.x][cmd.y]) {
        return [{
          id: cmd.id,
          event: {
            type: "PlayerPlacedIllegalMove",
            coordinates: {
              x: cmd.x,
              y: cmd.y
            },
            user: cmd.user
          },
          timeStamp: cmd.timeStamp
        }]
      }

      // Hmm, detecta að sami spilari sé að gera 2x?

      gameState.board[cmd.x][cmd.y] = cmd.side;
      if(gameState.isOver()) {

        return [{
          id: cmd.id,
          event: {
            type: "PlayerWon",
            user: cmd.user
          },
          timeStamp: cmd.timeStamp
        }, {
          id: cmd.id,
          event: {
            type: "GameEnded"
          },
          timeStamp: cmd.timeStamp
        }];
      }

      if(gameState.isDraw()) {
        return [{
          id: cmd.id,
          event: {
            type: "GameDraw"
          },
          timeStamp: cmd.timeStamp
        }, {
          id: cmd.id,
          event: {
            type: "GameEnded"
          },
          timeStamp: cmd.timeStamp
        }];
      }

      return [{
        id: cmd.id,
        event: {
          type: "PlayerPlacedMove",
          coordinates: {
            x: cmd.x,
            y: cmd.y
          },
          user: cmd.user
        },
        timeStamp: cmd.timeStamp
      }]
    }
  };

  return {
    executeCommand: function(cmd) {
      return handlers[cmd.comm](cmd);
    }
  };
};
