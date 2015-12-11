var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function() {
  var evt, command, expected;

  it('should create game', function() {
    evt = [];
    command = {
      id: "1234",
      gameId: "999",
      comm: "CreateGame",
      user: "Gulli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:29:44"
    };

    expected = [{
      id: "1234",
      gameId: "999",
      event: {
        type: "GameCreated",
        user: "Gulli",
      },
      timeStamp: "2015.12.02T11:29:44"
    }];

    var results = tictactoeCommandHandler(evt).executeCommand(command);
    console.log(results);
    JSON.stringify(results).should.be.exactly(JSON.stringify(expected));
  });

  it('should create game with another user another time', function() {
    evt = [];
    command = {
      id: "12347",
      comm: "CreateGame",
      gameId: "998",
      user: "Halli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T10:29:44"
    };

    expected = [{
      id: "12347",
      gameId: "998",
      event: {
        type: "GameCreated",
        user: "Halli",
      },
      timeStamp: "2015.12.02T10:29:44"
    }];

    var results = tictactoeCommandHandler(evt).executeCommand(command);

    JSON.stringify(results).should.be.exactly(JSON.stringify(expected));
  });
});


describe('join game command', function() {

  var evt, command, expected;

  it('should join game', function() {
    evt = [{
      id: "1234",
      gameId: "997",
      event: {
        type: "GameCreated",
        user: "Gulli",
      },
      timeStamp: "2015.12.02T11:29:44"
    }];

    command = {
      id: "12345",
      gameId: "997",
      comm: "PlayerJoined",
      user: "Halli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:30:50"
    };

    expected = [{
      id: "12345",
      gameId: "997",
      event: {
        type: "PlayerJoined",
        user: "Halli",
        otherUser: "Gulli",
      },
      timeStamp: "2015.12.02T11:30:50"
    }];

    var results = tictactoeCommandHandler(evt).executeCommand(command);

    JSON.stringify(results).should.be.exactly(JSON.stringify(expected));
  });

  it('should reject joining of a non-existing game', function() {
    evt = [];

    command = {
      id: "12345",
      gameId: "996",
      comm: "PlayerJoined",
      user: "Halli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:30:55"
    };

    expected = [{
      id: "12345",
      gameId: "996",
      event: {
        type: "GameDoesNotExist",
        user: "Halli",
      },
      timeStamp: "2015.12.02T11:30:55"
    }];

    var results = tictactoeCommandHandler(evt).executeCommand(command);

    JSON.stringify(results).should.be.exactly(JSON.stringify(expected));
  });
});
