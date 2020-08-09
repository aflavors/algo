DROP DATABASE IF EXISTS algo_db;

CREATE DATABASE algo_db;

USE algo_db;

CREATE TABLE songs
(
    id int NOT NULL AUTO_INCREMENT,
	artistName varchar(255) NOT NULL,
    songName varchar(255) NOT NULL,
    albumName varchar(255) NOT NULL,
    mp3 varchar(255) NOT NULL,
	albumArt varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE playlist
(
	id int NOT NULL AUTO_INCREMENT,
    playlistName varchar(255) NOT NULL,
    songID int,
    FOREIGN KEY (songID) REFERENCES songs(id),
    PRIMARY KEY (id)
);