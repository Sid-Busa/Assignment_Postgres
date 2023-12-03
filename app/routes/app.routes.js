module.exports = app => {
    const apps = require("../controllers/app.controller.js");
  
    let router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", apps.create);
  
    // Retrieve all apps by developer ID
    router.get("/:developerID", apps.findAllByDeveloperID);
    
    // Retrieve all accounts
    router.get("/", apps.findAll);

    // Retrieve a single Tutorial with id
    router.get("/app/:id", apps.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", apps.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", apps.delete);
  
    app.use('/api/apps', router);
  };