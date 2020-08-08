module.exports = function(sequelize, DataTypes){
    var Song = sequelize.define("Song", {
        artist: DataTypes.STRING,
        songTitle: DataTypes.STRING,
        album: DataTypes.STRING,
        mp3: DataTypes.STRING,
        albumArt: DataTypes.STRING,
    });
    return Song;
}