var tictactoeCommandHandler = require('./tictactoeCommandHandler');
var tictactoeState = require('./tictactoeState');

describe('create game command', function() {
  var evt, command, expected;

  it('should create game', function() {
    evt = [];
    command = {
      id: "1234",
      comm: "CreateGame",
      user: "Gulli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:29:44"
    };

    expected = [{
      id: "1234",
      event: {
        type: "GameCreated",
        user: "Gulli",
      },
      timeStamp: "2015.12.02T11:29:44"
    }];

    var results = tictactoeCommandHandler(evt).executeCommand(command);

    JSON.stringify(results).should.be.exactly(JSON.stringify(expected));
  });

  it('should create game with another user another time', function() {
    evt = [];
    command = {
      id: "12347",
      comm: "CreateGame",
      user: "Halli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T10:29:44"
    };

    expected = [{
      id: "12347",
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
      event: {
        type: "GameCreated",
        user: "Gulli",
      },
      timeStamp: "2015.12.02T11:29:44"
    }];

    command = {
      id: "12345",
      comm: "PlayerJoined",
      user: "Halli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:30:50"
    };

    expected = [{
      id: "12345",
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
      comm: "PlayerJoined",
      user: "Halli",
      name: "TheFirstGame",
      timeStamp: "2015.12.02T11:30:55"
    };

    expected = [{
      id: "12345",
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
