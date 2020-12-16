Game = require("../model/game");

exports.index = function (request, response){
    Game.get(function (err, games){
        if (err) {
            response.json({
                status: "error",
                message: err,
            });
        }
        response.json({
            status: "success",
            message: "Games retrieved successfully",
            data: games
        });
    });
}

exports.new = function (request, response){
    let game = new Game();
    game.gameType = request.body.gameType;

    game.save(function (err){
        if(err){
            response.json(err);
        }
        response.json({
            message: "New game created.",
            data: game
        });
    });
}

exports.view = function (request, response){
    Game.findById(request.params.gameid, function (err, game){
        if(err){
            response.send(err);
        }
        response.json({
            data: game
        });
    });
}
