// initialize the router
let router = require("express").Router();
let gameController = require("./controller/game");
let userController = require("./controller/user");

// default home endpoint response

router.get('/', function (request, response){
    response.json({
        status: "Home endpoint.",
        message: "Home api working!!!"
    });
});

router.route("/game")
    .get(gameController.index)
    .post(gameController.new);

router.route("/game/:gameid")
    .get(gameController.view);

router.route("/user/:username")
    .get(userController.get)
    .post(userController.new);

module.exports = router;
