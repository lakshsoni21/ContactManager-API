const express = require("express");
const { connect } = require("mongoose");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

// This will execute the connectDb() which will connect to DataBase
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// This helps to accept the incoming JSON data form client
app.use(express.json());

// For every request you are getting of /api/contacts then 
// contactRoutes will be opened for handling routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// Whenever we want to use middleware we use app.use()
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
