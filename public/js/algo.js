$(document).ready(function () {

    //Adding event listeners to the form
    $(document).on("click", "#search-button", handleArtistSearch);
    $(document).on("click", ".add", addSong);
    $(document).on("click", ".newPlaylistBtn", newPlaylist);
    $(document).on("click", "#dropdownMenuButton", displayPlaylistItems);
    $(document).on("click", "#playlist", addSongToPlaylist);

    var songArr = [];
    var playlistArr = [];
    var playlistId = [];

    function handleArtistSearch() {
        event.preventDefault();

        //Deezer API Call to Generate Song List(By Artist)
        let searchedArtist = $("#artist-search").val().trim();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + searchedArtist,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "2c16ee1f0amsh772cfb3a3a3da9bp18fa94jsnf1543312088d"
            }
        };


        $.ajax(settings).done(function (response) {
            console.log(response.data);
            songArr = response.data;

            for (var i = 0; i < songArr.length; i++) {
                var searchResDisplay = songArr[i].artist.name + " - " + songArr[i].title;
                console.log(searchResDisplay);
                var songId = songArr[i].id
                var songDisplay = `
                <ul class="list-group">
                <li class="list-group-item">${searchResDisplay}  <button type="button" id = ${i} class="btn btn-primary btn-sm add">Add Song</button>
                <div class="dropdown playlist-menu">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Add To Playlist
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Create New Playlist</a>
            <form id="playlistForm">
                <div class="form-group">
                    
                    <input type="text" class="form-control" id="playlistInput">
                    <button class="btn btn-secondary btn-md newPlaylistBtn" type="submit"> + </button>
                </div>
            </form>
            <ul class="list-group">
        {{#each list}}
        <li class="list-group-item">
          <a class="dropdown-item" id="playlist" href="#">{{playlistName}}</a>
        </li>
        {{/each}}
            </ul>
                </li>
                </ul>`

                $("#song-results").append(songDisplay);

                function addSongToPlaylist() {
                    event.preventDefault();

                    $.ajax("/api/playlist/:id", {
                        type: "POST",
                        data: {
                            Song: addSong
                        }
                    }).then(function(){
                        for (var y=0; y<songArr.length; y++){
                            $(songDisplay).append()
                        }
                    })
                }
                // 

                // }
            }
        }).then(function (response) {
            //Send to Songs table?

            //Clear form value
            $("#artist-search").val('');
            handleArtistSearch();
        });
    };
    function addSong() {
        event.preventDefault();
        var indexData = $(this).attr("id")
        console.log($(this).attr("id"));
        //ajax post request

        var songToAdd =
        {
            artistName: songArr[indexData].artist.name,
            songName: songArr[indexData].title,
            albumName: songArr[indexData].album.title,
            mp3: songArr[indexData].preview,
            albumArt: songArr[indexData].album.cover_big
        };
        console.log(songToAdd);

        $.ajax("/api/songs", {
            type: "POST",
            data: songToAdd
        }).then(function () {

            console.log(`added new song: ${songToAdd.songName} by ${songToAdd.artistName}`);
            //location.reload();
        });
    };

    function newPlaylist() {
        event.preventDefault();
        // $("#playlistForm").attr("method", post);
        // $("#playlistForm").attr("action", path);
        //place holder to populate once "create new playlist is clicked"
        var playlistToAdd = $("#playlistInput").val().trim();
        console.log(playlistToAdd);

        // console.log(playlistToAdd.playlistId);
        playlistArr.push(playlistToAdd);
        console.log(playlistArr);
        $.ajax("/api/playlist/new", {
            type: "POST",
            data: {
                playlistName: playlistToAdd,
            }
        }).then(function () {
            $.ajax("/api/playlist/:id", {
                type: "GET",
                data: {
                    playlistName: playlistToAdd
                },
            })
            console.log(`playlist ${playlistToAdd} added to database`)

            // console.log(`Added ${songToAdd.songName} by ${songToAdd.artistName} to ${playlistToAdd}`)
            $("#addPlaylist").append(playlistToAdd);


        });
    };
    function displayPlaylistItems() {
        event.preventDefault();

        var playlistName = $("#playlistInput").val().trim();

        $.ajax("/api/playlists/list", {
            type: "GET",
            data: {
                playlistName: playlistName
            },
        });
    };

    function addSongToPlaylist() {
        event.preventDefault();

        $.ajax("/api/playlist/:id", {
            type: "POST",
            data: {
                Song: addSong
            }
        })

    }
    console.log(`added song to playlist`)





});



