var db = require("../models");


module.exports = function(app) {
    app.get("/api/songs", function(req, res) {
      // Here we add an "include" property to our options in our findAll query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Post
      db.Song.findAll({
        include: [db.Post]
      }).then(function(dbSong) {
        res.json(dbSong);
      });
    });
  
    app.get("/api/songs/:id", function(req, res) {
      // Here we add an "include" property to our options in our findOne query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Post
      db.Song.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Post]
      }).then(function(dbSong) {
        res.json(dbSong);
      });
    });
  
    app.post("/api/songs", function(req, res) {
      db.Author.create(req.body).then(function(dbSong) {
        res.json(dbSong);
      });
    });
  
    app.delete("/api/songs/:id", function(req, res) {
      db.Song.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbSong) {
        res.json(dbSong);
      });
    });
  
  };
