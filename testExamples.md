## Text Examples

### Events

#### GameCreated

    {
        "gameId": 1,
        "event": {
            "type": "GameCreated",
            "player": "grimur"
        }
    }

#### PlayerJoined

    {
        "gameId": 1,
        "event": {
            "type": "PlayerJoined",
            "player": "pc"
        }
    }

#### GameStarted

    {
        "gameId": 1,
        "event": {
            "type": "GameStarted",
            "playerOne": "grimur",
            "playerTwo": "pc"
        }
    }

#### GameEnded

    {
        "gameId": 1,
        "event": {
            "type": "GameEnded",
        }
    }

#### PlayerLeft

    {
        "gameId": 1,
        "event": {
            "type": "PlayerLeft",
            "player": "pc"
        }
    }

#### PlayerPlacedIllegalMove

    {
        "gameId": 1,
        "event": {
            "type": "PlayerPlacedIllegalMove",
            "coordinates": [0,2]
        }
    }

#### PlayerPlacedMove

    {
        "gameId": 1,
        "event": {
            "type": "PlayerPlacedMove",
            "coordinates": [1, 2]
        }
    }

#### GameDraw

    {
        gameId: 1,
        "event": {
            "type": "GameDraw"
        }
    }

#### PlayerWon

    {
        gameId: 1,
        "event": {
            "type": "PlayerWonHorizontal",
            "player": "grimur"
        }
    }
