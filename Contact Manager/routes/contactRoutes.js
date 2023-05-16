const express = require("express");
const router = express.Router();
const { getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// This middleware will execute first and validate the token for any request made in this file here

// For every request which include /api/contacts then validateToken will be execute
// validateToken is a middleware function which runs in every request
router.use(validateToken);
// Get All Contacts and Create Contact
router.route("/").get(getContacts).post(createContact);
// Get Contact, Update Contact and Delete contact
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;