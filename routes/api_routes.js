var db = require("../models");


module.exports = function (app) {

    //song api routes

    app.get("/api/songs", function (req, res) {
        db.Song.findAll({
            include: [db.Post]
        }).then(function (dbSong) {
            res.json(dbSong);
        });
    });

    // app.get("/api/songs/:id", function (req, res) {
    //     db.Song.findOne({
    //         where: {
    //             id: req.params.id
    //         },
    //         include: [db.Post]
    //     }).then(function (dbSong) {
    //         res.json(dbSong);
    //     });
    // });

    // app.post("/api/songs", function (req, res) {
    //     db.Song.create(req.body).then(function (dbSong) {
    //         res.json(dbSong);
    //     });
    // });

    app.delete("/api/songs/:id", function (req, res) {
        db.Song.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbSong) {
            res.json(dbSong);
        });
    });
};

//playlist api routes

app.get("/api/playlists", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Playlist.findAll({
        where: {
            id: req.params.id
        },
        include: [db.Post]
    }).then(function (dbPlaylist) {
        res.json(dbPlaylist);
    });
});

app.get("/api/playlist/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Playlist.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Post]
    }).then(function (dbPlaylist) {
        res.json(dbPlaylist);
    });
});

app.Post("/api/playlist/new", function (req, res) {
    db.Playlist.create(req.body).then(function (dbPlaylist) {
        res.json(dbPlaylist);
    });
});

//adds song to playlist
app.Post("/api/playlist/addsong/:playlistid", function (req, res) {
    console.log(req.params.playlistid);
    console.log(req.body);  
    var newSongId;


    //make one call to dbSongs.create
    db.Song.create(req.body).then(function (dbSong) {
        //res.json(dbSong);
        console.log(dbSong)
        newSongId = dbSong.id;

        //find a way to return the playlist id just created
    });

    // create object to insert for a new row in the playlist table
    var playlistSong = {
        playListName: req.params.playlistid,
        songId: newSongId
    };
    

    db.Playlist.create(playListSong).then(function (dbresponse) {
        res.json(dbresponse);


    })

    // db.Playlist.create(req.body).then(function (dbPlaylist) {
    //     res.json(dbPlaylist)
    // });
});

// ROUTE TO ADD A PLAYLIST


app.Delete("/api/playlist/delete/:id", function (req, res) {
    db.Playlist.delete({
        where: {
            id: req.params.id
        }
    }).then(function (dbPlaylist) {
        res.json(dbPlaylist)
    })
});

app.Delete("/api/playlist/song/delete/:id", function (req, res) {
    db.Playlist.delete({
        where: {
            id: req.params.id
        }
    }).then(function (dbPlaylist) {
        res.json(dbPlaylist)
    })
});




