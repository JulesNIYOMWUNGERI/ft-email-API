module.exports = app => {
    const emails = require("../controllers/email.controller.js");
  
    const router = require("express").Router();
  
    // Create a new emails
    router.post("/", emails.create);
  
    // Retrieve all emails
    router.get("/", emails.findAll);

    // Delete emails
    router.delete("/", emails.delete);

  
    app.use('/api/emails', router);
};