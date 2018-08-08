var request = require("request");
var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var databaseUrl = "newsScraper";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});

app.get("/scrape", function (req, res) {

  request("https://www.npr.org/", function (error, response, html) {

    var $ = cheerio.load(html);

    $("div.story-text").each(function (i, element) {

      var link = $(element).children().find("a").attr("href");
      var title = $(element).children().find("h3.title").text();
      var summary = $(element).children().find("p.teaser").text();

      db.articles.insert({title: title, link: link, summary: summary});

  });

    res.send("Scrape complete.");

  });
});

app.get("/all", function(req, res) {

  db.articles.find({}, function(error, found) {
    
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }

  });
});