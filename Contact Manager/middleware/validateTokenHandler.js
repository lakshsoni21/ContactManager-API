//Prerequist-> To understand what is JWT then see the notes in notion

const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    // Token is passed inside a Authorization header in HTTP
    let authHeader = req.headers.Authorization || req.headers.authorization;

    // Inside Authorization there is Bearer where token is passed
    if(authHeader && authHeader.startsWith("Bearer")){

        // Token passed like this inside header part of Authorization -> Bearer "TOKEN"
        // at [0] => Bearer and at [1] => There is Token
        token = authHeader.split(" ")[1];

        // This verify function in jwt will verify token, so we need to pass
        // secret key inside this function, to know how verification works go to notes in notion
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized");

            }
            // Now the above if condition not runs means that out token is verified successfully

            // What is Decoded Variable??
            // So a decoded variable which is inside a callback parameter of jwt.verify()
            // decoded variable stores the decoded data (JSON) of the token which is passed in request
            // and you know that JWT has 3 parts so the 3 parts in decoded form 
            // In our case payload inside a token contains the user data
            // So the decoded.user => means the user data {}

            // What is req.user
            // req.user is simple a default property of request object in express which shows 
            // the information of a person (user data) which is making request
            // ByDefault req.user = undefined 
            // req.user helps in dynamic website (user specific pages)
            // So when we authenticated with the person making request then
            // we assign the user {} object which shows the user data whose making requst
            // so then we can send response specifically for that user with he help of user data
            // Which is present in user object inside request object
            req.user = decoded.user;
            // This next() will execute next middleware function which is in the routes file
            // router.get("/current", validateToken, currentUser);
            // validateToken works is complete so to execute next function which is here currentUser 
            // we use next()
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
})

module.exports = validateToken;