$(document).ready(function(){

    //Adding event listeners to the form
    $(document).on("click", "#search-button", handleArtistSearch);
    $(document).on("click", ".add", addSong);
    var songArr = [];
    var playlistArr = [];

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
                // var songResults = [{
                //     artist: songArr[i].artist.name,
                //     songTitle: songArr[i].title,
                //     album: songArr[i].album.title,
                //     mp3: songArr[i].preview,
                //     albumArt: songArr[i].album.cover_big
                // }];
                
                var searchResDisplay = songArr[i].artist.name + " - " + songArr[i].title;

                
                console.log(searchResDisplay);

                var songDisplay = `
                <ul class="list-group">
                <li class="list-group-item">${searchResDisplay}  <button type="button" id = ${i}  class="btn btn-primary btn-sm add">Add Song</button></li>
                </ul>`
      
                $("#song-results").append(songDisplay);
              }
        }).then(function (response){
            //Send to Songs table?

            //Clear form value
            $("#artist-search").val('');
            handleArtistSearch();
        });

    }
        function addSong (event){
            event.preventDefault();
            $(this).attr("id")
            console.log($(this).attr("id"));
            //ajax post request
        var songToAdd = 
        //
        {
            //name: $(songresults).val().trim()
            name : $("#add").text(),
            songTitle: songResults.songTitle,
            album: songResults.album,
            mp3: songResults.mp3,
            albumArt: songResults.albumArt
        };
        $.ajax("/api/songs", {
            type: "POST",
            data: songToAdd
        }).then(function () {
            console.log(`added new song: ${songToAdd}`);
            location.reload();
        });
    };
});