'use strict';

var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('Player placed move command', function() {
  it('player can win diagonally', function() {
    var events = [{
      id: 1,
      event: {
        type: "CreateGame",
        user: "Gulli"
      },
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id: 2,
      event: {
        type: "PlayerJoined",
        user: "Gulli",
        otherUser: "Grimur"
      },
      timeStamp: "2015.12.02T12:29:44"
    }, {
      id: 3,
      event: {
        type: "PlayerPlacedMove",
        side: "O",
        x: 0,
        y: 0,
        user: "Gulli"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 4,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 1,
        y: 0,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 5,
      event: {
        type: "PlayerPlacedMove",
        user: "Gulli",
        side: "O",
        x: 1,
        y: 1
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 6,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 0,
        y: 2,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }];

    var command = {
      id: 7,
      comm: "PlayerPlacedMove",
      user: "Gulli",
      timeStamp: "2015.12.02T12:35:44",
      side: "O",
      x: 2,
      y: 2
    }

    var expected = [{
      id: 7,
      event: {
        type: "PlayerWon",
        user: "Gulli"
      },
      timeStamp: "2015.12.02T12:35:44",
    }, {
      id: 7,
      event: {
        type: "GameEnded"
      },
      timeStamp: "2015.12.02T12:35:44",
    }]

    var results = tictactoeCommandHandler(events).executeCommand(command);

    JSON.stringify(results).should.be.exactly(JSON.stringify(expected));
  });

  it('player can win diagonally against', function() {
    var events = [{
      id: 1,
      event: {
        type: "CreateGame",
        user: "Gulli"
      },
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id: 2,
      event: {
        type: "PlayerJoined",
        user: "Gulli",
        otherUser: "Grimur"
      },
      timeStamp: "2015.12.02T12:29:44"
    }, {
      id: 3,
      event: {
        type: "PlayerPlacedMove",
        side: "O",
        x: 0,
        y: 2,
        user: "Gulli"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 4,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 0,
        y: 0,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 5,
      event: {
        type: "PlayerPlacedMove",
        user: "Gulli",
        side: "O",
        x: 1,
        y: 1
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 6,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 0,
        y: 1,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }];

    var command = {
      id: 7,
      comm: "PlayerPlacedMove",
      user: "Gulli",
      timeStamp: "2015.12.02T12:37:44",
      side: "O",
      x: 2,
      y: 0
    }

    var expected = [{
      id: 7,
      event: {
        type: "PlayerWon",
        user: "Gulli"
      },
      timeStamp: "2015.12.02T12:37:44",
    }, {
      id: 7,
      event: {
        type: "GameEnded"
      },
      timeStamp: "2015.12.02T12:37:44",
    }]

    var results = tictactoeCommandHandler(events).executeCommand(command);

    JSON.stringify(results).should.be.exactly(JSON.stringify(expected));
  });

  it('player can win vertically row 1', function() {
    var events = [{
      id: 1,
      event: {
        type: "CreateGame",
        user: "Gulli"
      },
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id: 2,
      event: {
        type: "PlayerJoined",
        user: "Gulli",
        otherUser: "Grimur"
      },
      timeStamp: "2015.12.02T12:29:44"
    }, {
      id: 3,
      event: {
        type: "PlayerPlacedMove",
        side: "O",
        x: 0,
        y: 0,
        user: "Gulli"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 4,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 1,
        y: 0,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 5,
      event: {
        type: "PlayerPlacedMove",
        user: "Gulli",
        side: "O",
        x: 0,
        y: 1
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 6,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 1,
        y: 1,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }];

    var command = {
      id: 7,
      comm: "PlayerPlacedMove",
      user: "Gulli",
      timeStamp: "2015.12.02T12:36:44",
      side: "O",
      x: 0,
      y: 2
    }

    var expected = [{
      id: 7,
      event: {
        type: "PlayerWon",
        user: "Gulli"
      },
      timeStamp: "2015.12.02T12:36:44",
    }, {
      id: 7,
      event: {
        type: "GameEnded"
      },
      timeStamp: "2015.12.02T12:36:44",
    }]

    var results = tictactoeCommandHandler(events).executeCommand(command);

    JSON.stringify(results).should.be.exactly(JSON.stringify(expected));
  });

  it('player can win horizontally row 1', function() {
    var events = [{
      id: 1,
      event: {
        type: "CreateGame",
        user: "Gulli"
      },
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id: 2,
      event: {
        type: "PlayerJoined",
        user: "Gulli",
        otherUser: "Grimur"
      },
      timeStamp: "2015.12.02T12:29:44"
    }, {
      id: 3,
      event: {
        type: "PlayerPlacedMove",
        side: "O",
        x: 0,
        y: 0,
        user: "Gulli"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 4,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 2,
        y: 1,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 5,
      event: {
        type: "PlayerPlacedMove",
        user: "Gulli",
        side: "O",
        x: 1,
        y: 0
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 6,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 1,
        y: 1,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }];

    var command = {
      id: 7,
      comm: "PlayerPlacedMove",
      user: "Gulli",
      timeStamp: "2015.12.02T12:36:44",
      side: "O",
      x: 2,
      y: 0
    }

    var expected = [{
      id: 7,
      event: {
        type: "PlayerWon",
        user: "Gulli"
      },
      timeStamp: "2015.12.02T12:36:44",
    }, {
      id: 7,
      event: {
        type: "GameEnded"
      },
      timeStamp: "2015.12.02T12:36:44",
    }]

    var results = tictactoeCommandHandler(events).executeCommand(command);

    JSON.stringify(results).should.be.exactly(JSON.stringify(expected));
  });

  it('there can be a draw', function() {
    var events = [{
      id: 1,
      event: {
        type: "CreateGame",
        user: "Gulli"
      },
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id: 2,
      event: {
        type: "PlayerJoined",
        user: "Gulli",
        otherUser: "Grimur"
      },
      timeStamp: "2015.12.02T12:29:44"
    }, {
      id: 3,
      event: {
        type: "PlayerPlacedMove",
        side: "O",
        x: 0,
        y: 0,
        user: "Gulli"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 4,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 1,
        y: 1,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 5,
      event: {
        type: "PlayerPlacedMove",
        user: "Gulli",
        side: "O",
        x: 2,
        y: 0
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 6,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 1,
        y: 0,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 7,
      event: {
        type: "PlayerPlacedMove",
        user: "Gulli",
        side: "O",
        x: 1,
        y: 2
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 8,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 0,
        y: 1,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 7,
      event: {
        type: "PlayerPlacedMove",
        user: "Gulli",
        side: "O",
        x: 2,
        y: 1
      },
      timeStamp: "2015.12.02T12:30:44"
    }, {
      id: 8,
      event: {
        type: "PlayerPlacedMove",
        user: "Grimur",
        x: 2,
        y: 2,
        side: "X"
      },
      timeStamp: "2015.12.02T12:30:44"
    }];

    var command = {
      id: 15,
      comm: "PlayerPlacedMove",
      user: "Gulli",
      timeStamp: "2015.12.02T12:36:44",
      side: "O",
      x: 0,
      y: 2
    }

    var expected = [{
      id: 15,
      event: {
        type: "GameDraw"
      },
      timeStamp: "2015.12.02T12:36:44",
    }, {
      id: 15,
      event: {
        type: "GameEnded"
      },
      timeStamp: "2015.12.02T12:36:44",
    }]

    var results = tictactoeCommandHandler(events).executeCommand(command);

    JSON.stringify(results).should.be.exactly(JSON.stringify(expected));
  });
});
