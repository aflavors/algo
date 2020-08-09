module.exports = function(sequelize, DataTypes){
    // SEE IF THIS HAS TO MATCH THE DB TABLE NAMES IE: SONG_NAME
    var Song = sequelize.define("Song", {
        artistName: DataTypes.STRING,
        songName: DataTypes.STRING,
        albumName: DataTypes.STRING,
        mp3: DataTypes.STRING,
        albumArt: DataTypes.STRING,
    });
    return Song;
}