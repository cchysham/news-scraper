var db = require("../models");
const request = require("request");
const cheerio = require("cheerio");

/*db.on("error", function (error) {
  console.log("Database Error:", error);
});*/
/*
module.exports = function (app) {
  app.get("/articles", function (req, res) {

    request("https://www.npr.org/", function (error, response, html) {

      var $ = cheerio.load(html);

      $("div.story-text").each(function (i, element) {

        var link = $(element).children().find("a").attr("href");
        var title = $(element).children().find("h3.title").text();
        var summary = $(element).children().find("p.teaser").text();

        db.Article.create({ title: title, link: link, summary: summary });

      });

      res.send("Scrape complete.");

    });
  });

  app.get("/articles", function (req, res) {

    db.Article.find({saved: false}, function (error, found) {

      if (error) {
        console.log(error);
      }
      else {
        res.json(found);
      }

    });
  });

  app.get("/saved", function (req, res) {

    db.Article.find({saved: true}, function (error, found) {

      if (error) {
        console.log(error);
      }
      else {
        res.json(found);
      }

    });
  });

  app.get("/articles/:id", function(req, res) {

    db.Article.findOne({ _id: req.params.id }).populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      }).catch(function(err) {
        res.json(err);
      });
  });
  
  // NOTE ROUTE
  /*app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
      }).then(function(dbArticle) {
        res.json(dbArticle);
      }).catch(function(err) {
        res.json(err);
      });
  });

  app.put("/api/articles/:id", function(req, res) {
    db.Article.findByIdAndUpdate(req.params.id, req.body.saved),
    (err, data) => {
      if (err){
        console.log(err);
      } else {
        res.json(data);
      }
    }
  });

  app.delete("/articles", function(req, res) {
    db.Article.remove({}).then(function(err, data) {
      res.json(data);
    })
  });






}
*/


module.exports = function(app) {
  var db = require("../models");
const request = require("request");
const cheerio = require("cheerio");

/*db.on("error", function (error) {
  console.log("Database Error:", error);
});*/


  app.get("/scrape", function (req, res) {

    request("https://www.npr.org/", function (error, response, html) {

      var $ = cheerio.load(html);

      $("div.story-text").each(function (i, element) {

        var link = $(element).children().find("a").attr("href");
        var title = $(element).children().find("h3.title").text();
        var summary = $(element).children().find("p.teaser").text();

        db.Article.create({ title: title, link: link, summary: summary });

      });

      res.send("Scrape complete.");

    });
  });

  app.get("/articles", function (req, res) {

    db.Article.find({saved: false}, function (error, found) {

      if (error) {
        console.log(error);
      }
      else {
        res.json(found);
      }

    });
  });

  app.get("/saved", function (req, res) {

    db.Article.find({saved: true}, function (error, found) {

      if (error) {
        console.log(error);
      }
      else {
        res.json(found);
      }

    });
  });


  app.get("/articles/:id", function(req, res) {

    db.Article.findOne({ _id: req.params.id }).populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      }).catch(function(err) {
        res.json(err);
      });
  });
  
  // NOTE ROUTE
  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      }).then(function(dbArticle) {
        res.json(dbArticle);
      }).catch(function(err) {
        res.json(err);
      });
  });
  
  app.put("/api/articles/:id", function(req, res) {
    db.Article.findByIdAndUpdate(req.params.id, req.body.saved),
    (err, data) => {
      if (err){
        console.log(err);
      } else {
        res.json(data);
      }
    }
  });

  app.delete("/delete", function(req, res) {
    db.Article.remove({}).then(function(err, data) {
      res.json(data);
    })
  });

};
