User = require("../model/user")

exports.get = function (request, response){
    User.findOne({username: request.params.username}, function (err, user){
        if(err){
            response.send(err);
        }
        response.json({
            data: user
        });
    })
}

exports.new = function (request, response){
    user = new User();
    user.username = request.params.username;

    user.save(function(err){
        if(err){
            response.send(err);
        }
        response.json({
            message: "User created.",
            data: user
        });
    });
}
