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
    .post(gameController.new)
    .patch(gameController.patch);

router.route("/game/:gameid")
    .get(gameController.findById);

router.route("/login/:username")
    .get(userController.login);

router.route("/signup/:username")
    .get(userController.new);

module.exports = router;
