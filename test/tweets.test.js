var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/tweets", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Tweet.bulkCreate([ text: "First Example",
       replies: 2,
       profile: "agtyk" ,
       username: "agtyk" ,
       trend: "#trend" ,
      location: "denver" ,
       retweets: 5 ,
      favorites: 7 
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/tweets").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes(
            { text: "First Example" },
            { replies: 2 },
          { profile: "agtyk" },
          { username: "agtyk" },
          { trend: "#trend" },
          { location: "denver" },
          { retweets: 5 },
          { favorites: 7 });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ text: "First Example" },
          { replies: 2 },
          { profile: "agtyk" },
          { username: "agtyk" },
          { trend: "#trend" },
          { location: "denver" },
          { retweets: 5 },
            { favorites: 7 }
          );

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
