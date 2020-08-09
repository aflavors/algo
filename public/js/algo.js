$(document).ready(function(){

    //Adding event listeners to the form
    $(document).on("click", "#search-button", handleArtistSearch);
    $(document).on("click", ".add", addSong);
    var songArr = [];
    var playlistArr = [];
    var playlistId = 1

    //button level
    // data-playlistid = 1

    function handleArtistSearch(event){
        event.preventDefault();

        //Don't do anything if the artist search field hasn't been filled out
        // if(!searchedArtist.val().trim().trim()){
        //     return;
        // }

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

    
        $.ajax(settings).done(function (response){
            console.log(response.data);
            songArr = response.data;

            for (var i=0; i< songArr.length; i++){
                var searchResDisplay = songArr[i].artist.name + " - " + songArr[i].title;
                console.log(searchResDisplay);
                var songId = songArr[i].id
                var songDisplay = `
                <ul class="list-group">
                <li class="list-group-item">${searchResDisplay}  <button type="button" id = ${i} class="btn btn-primary btn-sm add">Add Song</button></li>
                </ul>`
      
                $("#song-results").append(songDisplay);
              }
        }).then(function (response){
            //Send to Songs table?

            //Clear form value
            $("#artist-search").val('');
            handleArtistSearch();
        });
    };
        function addSong (event){
            event.preventDefault();
            var indexData = $(this).attr("id")
            console.log($(this).attr("id"));
            //ajax post request

        var songToAdd = 
        {
            artistName : songArr[indexData].artist.name,
            songTitle: songArr[indexData].artist.title,
            albumName: songArr[indexData].artist.album,
            mp3: songArr[indexData].artist.mp3,
            albumArt: songArr[indexData].artist.albumArt
        };
        console.log(songToAdd);
        
        $.ajax("/api/playlist/addsong/" + playlistId, {
            type: "POST",
            data: songToAdd
        }).then(function () {
            console.log(`added new song: ${songToAdd}`);
            location.reload();
        });
    };
});