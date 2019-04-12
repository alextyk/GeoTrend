var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tweets", function(req, res) {
    if (req.query.trend) {
      db.Tweet.findAll({
        where: {
          trend: req.query.trend
        }
      }).then(function(dbExamples) {
        res.json(dbExamples);
      });
    } else {
      res.status(400);
      res.send("None shall pass");
    }
  });

  // Create a new example
  app.post("/api/tweets", function(req, res) {
    db.Tweet.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
