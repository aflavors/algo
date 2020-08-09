module.exports = function(sequelize, DataTypes){
    var Playlist = sequelize.define("Playlist", {
        playlistName: DataTypes.STRING,
        songID: DataTypes.INTEGER
    });
    return Playlist;
}