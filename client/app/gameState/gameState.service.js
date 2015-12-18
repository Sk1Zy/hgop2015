'use strict';

angular.module('tictactoeApp')
  .factory('gameState', function () {
    return function () {

      var gameState = {
        created: false,
        board: [['', '', ''], ['', '', ''], ['', '', '']],
        nextTurn: 'X',
        gameDraw: false,
        winner: undefined,
        mutate: function (events) {
          var handlers = {
            'GameCreated': function (event, gameState) {
              gameState.created = true;
              gameState.name = event.name;
              gameState.gameId = event.gameId;
              gameState.creatingUser = event.event.user;
            },
            'PlayerJoined': function (event, gameState) {
              gameState.joiningUser = event.event.user;
            },
            'PlayerPlacedMove': function (event, gameState) {
              var x = event.event.coordinates.x, y = event.event.coordinates.y;
              gameState.board[x][y] = event.event.side;
              gameState.nextTurn = event.event.side === 'X' ? 'O' : 'X';
            },
            'PlayerWon': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.winner = event.event.user;
            },
            'GameDraw': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.gameDraw = true;
            }
          };
          _.each(events, function (ev) {
            if(!ev) {
              return;
            }
            if(handlers[ev.event.type]){
              handlers[ev.event.type](ev, gameState);
            }
          });
        }
      };
      return gameState;
    };
  });
