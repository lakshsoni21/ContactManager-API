// We created this because whenever we are throwing error to client
// The error is in the form of HTML but we want to send the error in the form of JSON

// Importing out error codes
const {constants} = require("../constants")


// That's we created the middleware
// Whenever our server throw error to client our middleware function will be executed
// Here in this middleware function we are just using err, res objects to handle error
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        // Inplace of constants.VALIDATION_ERROR out code will be put on which 400
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation Failed", message: err.message, stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title: "Not Found", message: err.message, stackTrace: err.stack});
            break;
        
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized", message: err.message, stackTrace: err.stack});
            break;

        case constants.FORBIDDEN:
            res.json({title: "Forbidden", message: err.message, stackTrace: err.stack});
            break;

        case constants.SERVER_ERROR:
            res.json({title: "Server Error", message: err.message, stackTrace: err.stack});
            break;

        default:
            console.log("No Error, All Good!");
            break;
    }

};

module.exports = errorHandler;