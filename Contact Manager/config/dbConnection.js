const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        //await means that mongoose.connect() is an async operation so if we don't add
        //await then JS Engine will jump to next line and executes the line 
        // and log it Database Connected but you know our database is not connected yet,
        // we want to complete this mongoose connection first then we want 
        // further line execution so await will wait until the connection is not achieved with DB
        // Or while connection if we got error then it will catch the err 
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        // Dabase Connected will printed when our above line completely executed
        console.log("Database Connected", connect.connection.host, connect.connection.name)

    } catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;