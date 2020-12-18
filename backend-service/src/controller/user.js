const httpStatusCodes = require('http-status-codes');
const StatusCodes = httpStatusCodes.StatusCodes;
const User = require("../model/user")

const userControllerStatusCodes = {
    // Success codes
    USER_CREATED: 1000,
    USER_FOUND: 1001,
    // Bad request
    USER_NOT_FOUND: 1400,
    // Error codes
    DUPLICATE_USER: 1100,
    // Internal server error
    INTERNAL_SERVER_ERROR: 1500
}

exports.new = function (request, response){
    let userInstance = new User();
    userInstance.username = request.params.username;

    userInstance.save( function (err){
        if(err){

            let returnStatus = StatusCodes.INTERNAL_SERVER_ERROR;
            let errorResponseMessage = err;

            if(err.hasOwnProperty("code") && err["code"] === 11000) {
                returnStatus = StatusCodes.BAD_REQUEST;
                errorResponseMessage["response"] = "Username already exists.";
                errorResponseMessage["status"] = userControllerStatusCodes.DUPLICATE_USER;
                errorResponseMessage["response_status"] = "ERROR";
            }else{
                returnStatus = StatusCodes.INTERNAL_SERVER_ERROR;
                errorResponseMessage["response"] = "Something went wrong.";
                errorResponseMessage["status"] = userControllerStatusCodes.INTERNAL_SERVER_ERROR;
                errorResponseMessage["response_status"] = "ERROR";
            }

            response
                .status(returnStatus)
                .json(errorResponseMessage);
        } else{

            let responseMessage = {
                "response": "User created.",
                data: [userInstance],
                "status": userControllerStatusCodes.USER_CREATED,
                "response_status": "OK"
            }

            response
                .status(StatusCodes.CREATED)
                .json(responseMessage)

        }
    })
}

exports.login = function (request, response){
    User.findOne({username: request.params.username}, function (err, user){

        let errorResponse = err;

        if(err){

            errorResponse["status"] = userControllerStatusCodes.INTERNAL_SERVER_ERROR;
            errorResponse["response"] = "Something went wrong.";
            errorResponse["response_status"] = "ERROR";

            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(errorResponse);
        }

        if(!user){
            errorResponse = {}
            errorResponse["status"] = userControllerStatusCodes.USER_NOT_FOUND;
            errorResponse["response_status"] = "ERROR";
            errorResponse["response"] = "No user with this username exists. Try signing up.";

            response
                .status(StatusCodes.NOT_FOUND)
                .json(errorResponse)
        }else{
            response
                .status(StatusCodes.OK)
                .json({
                    response: "Login successful.",
                    user_details: user,
                    status: userControllerStatusCodes.USER_FOUND,
                    response_status: "OK"
                });
        }
    });
}
