module.exports = app => {
  const utilisateur = require("../controllers/utilisateur.controllers.js");
  var router = require("express").Router();

  router.post("/login", utilisateur.login);  // login
  router.get("/", utilisateur.get);           // liste tous
  router.post("/", utilisateur.create);       // création

  app.use('/api/utilisateur', router);
};
