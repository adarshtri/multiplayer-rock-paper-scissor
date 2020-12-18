const httpStatusCodes = require('http-status-codes');
const StatusCodes = httpStatusCodes.StatusCodes;
const Game = require("../model/game");

const gameStatusCodes = {
    // success codes
    GAME_CREATED: 1000,
    GAME_FOUND: 1001,
    GAME_UPDATED: 1002,

    // bad request
    GAME_NOT_FOUND: 1400,

    // server errors
    ERROR_CREATING_GAME: 1500,
    ERROR_FINDING_GAME: 1501,
    ERROR_UPDATING_GAME: 1502
}

exports.new = function (request, response){
    let game = new Game(request.body);

    game.save(function (err){

        let errorResponse = err;

        if(err){
            errorResponse["status"] = gameStatusCodes.ERROR_CREATING_GAME;
            errorResponse["response"] = "Something went wrong in game creation.";
            errorResponse["response_status"] = "ERROR";
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(errorResponse);
        }
        response
            .status(StatusCodes.OK)
            .json({
                response: "New game created.",
                response_status: "OK",
                status: gameStatusCodes.GAME_CREATED,
                data: game
        });
    });
}

exports.findById = function (request, response){
    Game.findOne({_id: request.params.gameid}, function (err, game){

        let errorResponse = err;

        if(err){
            errorResponse["response"] = "Something went wrong/ game not found."
            errorResponse["response_status"] = "ERROR";
            errorResponse["status"] = gameStatusCodes.ERROR_FINDING_GAME;
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(errorResponse);
        }
        else{
            response
                .status(StatusCodes.OK)
                .json({
                    response: "Game found.",
                    response_status: "OK",
                    status: gameStatusCodes.GAME_FOUND,
                    data: game
                });
        }
    });
}

exports.patch = function(request, response){

    const query = request.body.query;
    const update = request.body.update;


    Game.update(query, update, null,function (err, numUpdates){

       if(err){
           let errorResponse = err;
           errorResponse["response_status"] = "ERROR";
           errorResponse["response"] = "Something went wrong updating game.";
           errorResponse["status"] = gameStatusCodes.ERROR_UPDATING_GAME;

           response
               .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
               .json(errorResponse);
       }else{

           if(numUpdates.n >= 1){
               Game.findOne(query, function (error, game){
                   if(error){
                       let findErrorResponse = error;
                       findErrorResponse["response_status"] = "ERROR";
                       findErrorResponse["response"] = "Something went wrong finding updated game.";
                       findErrorResponse["status"] = gameStatusCodes.ERROR_FINDING_GAME;

                       response
                           .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
                           .json(findErrorResponse);
                   }else{
                       let responseBody = {}
                       responseBody["response_status"] = "OK";
                       responseBody["response"] = "Game updated successfully.";
                       responseBody["status"] = gameStatusCodes.GAME_UPDATED;
                       responseBody["data"] = game;

                       response
                           .status(httpStatusCodes.OK)
                           .json(responseBody);
                   }
               })
           }
       }

    });

}
