const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
      unique: [true, "Username already exist"],
    },

    email: {
      type: String,
      required: [true, "Please add the user email address"],
      // The email should be unique means not that already in use
      // If the email is not unique then this "" message will printed
      unique: [true, "Email address already exist"],
    },
    
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

// Here model takes two arguments 1. collectionName, 2. Schema
// The  collection name here is User which is singular
// But when you see in the DB you will see users because mongoDB converts this "User" -> "users"
module.exports = mongoose.model("User", userSchema);
