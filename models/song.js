module.exports = function(sequelize, DataTypes){
    // SEE IF THIS HAS TO MATCH THE DB TABLE NAMES IE: SONG_NAME
    var Song = sequelize.define("Song", {
        artistName: {
            type: DataTypes.STRING},
        songName: {
            type: DataTypes.STRING},
        albumName: {
            type: DataTypes.STRING},
        mp3: {
            type: DataTypes.STRING},
        albumArt:{ 
            type: DataTypes.STRING},
    });
    
    return Song;
};