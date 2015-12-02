## Text Examples

### Events

#### GameCreated

    {
        "gameId": 1,
        "user": "grimur",
        "event": {
            "type": "GameCreated",
            "player": "grimur"
        }
    }


#### PlayerJoined

    {
        "gameId": 1,
        "user": "pc",
        "event": {
            "type": "PlayerJoined",
            "player": "pc"
        }
    }

#### GameStarted

    {
        "gameId": 1,
        "user": "grimur",
        "event": {
            "type": "GameStarted",
            "playerOne": "grimur",
            "playerTwo": "pc"
        }
    }

#### PlayerLeft

    {
        "gameId": 1,
        "user": "pc",
        "event": {
            "type": "PlayerLeft",
            "player": "pc"
        }
    }

#### PlayerPlacedIllegalMove

    {
        "gameId": 1,
        "user": "pc",
        "event": {
            "type": "PlayerPlacedIllegalMove",
            "coordinates": [0,2]
        }
    }

#### PlayerPlacedMove

    {
        "gameId": 1,
        "user": "grimur",
        "event": {
            "type": "PlayerPlacedMove",
            "coordinates": [1, 2]
        }
    }

#### GameDraw

    {
        gameId: 1,
        "user": "grimur",
        "event": {
            "type": "GameDraw"
        }
    }

#### PlayerWonHorizontal

    {
        gameId: 1,
        "user": "grimur",
        "event": {
            "type": "PlayerWonHorizontal",
            "player": "grimur"
        }
    }

#### PlayerWonVertical

    {
        gameId: 1,
        "user": "pc",
        "event": {
            "type": "PlayerWonVertical",
            "player": "pc"
        }
    }

#### PlayerWonDiagonal

    {
        gameId: 1,
        "user": "grimur",
        "event": {
            "type": "PlayerWonDiagonal",
            "player": "pc"
        }
    }
