var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tweets", function(req, res) {
    db.Tweet.findAll({
      where: {
        trend: req.body
      }
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/tweets", function(req, res) {
    db.Tweet.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
