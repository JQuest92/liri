require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var cmnd = process.argv[2];
var inpt = process.argv.slice(3).join(" ");

switch (cmnd) {
    case "concert-this":
        rockOutLive();
        break;
    case "movies-this":
        noAttentionSpanForThat();
        break;
    case "spotify-this-song":
        rockOutAlone();
        break;
    case "do-what-it-says":
        doItDOITNOW();
        break;
}

function rockOutLive()
 {
    var bandURL = "https://rest.bandsintown.com/artists/" + inpt + "/events?app_id=codingbootcamp";
    axios
        .get(bandURL)
        .then(function (response, Error) {
            for (var i = 0; i < 9; i++) 
            {
                console.log("Venue: " + response.data[i].venue.name + "\n" + 
                "Location: " + response.data[i].venue.name + ", " + response.data[i].venue.city + "\n"
                 + "Time: " + moment(response.data[i].datetime).format('LL'));
            }
        })
}

function noAttentionSpanForThat() 
{
    var movieURL = "http://www.omdbapi.com/?=" + inpt + "&y=&plot=short&apikey=trilogy";
    axios.get(movieURL).then
    (
        function (response) 
        {
            console.log("Title: " + response.data.Title + "\n" + "Year Released: " + response.data.Released + "\n"
            + "IMDB Rating: " + response.data.imdbRating + "\n" + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n"
            + "Country: " + response.data.Country + "\n" + "Language: " + response.data/Language + "\n"
            + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors)
        }
    );
}

function rockOutAlone() 
{
    if (inpt === "")
        inpt = "Ace of Base The Sign";

    spotify.search({ 
        type: 'track', 
        query: inpt})
    .then(function (response) {

        for (var i = 0; i < 5; i++) 
        {
            if (response.tracks.items[i].preview_url === "")
                var previewLink = "N/A"
            else
                var previewLink = response.tracks.items[i].preview_url;
    
            var band = response.tracks.items[i].album.artists[0].name;
            var song = response.tracks.items[i].name;
            var album = response.tracks.items[i].album.name;
            console.log("Arist: " + band + "\nSong: " + song + "\nPreview: " + previewLink + "\nAlbum: " + album + "\n");
        }
    });
}

function doItDOITNOW()
{
    fs.readFile("random.txt", "utf8", function(error, text)
     {
        if (error)
          return console.log(error);
        
        var data = text.split(",");
        cmnd= data[0];
        inpt = data[1];
        console.log(data);
        
        switch(cmnd)
        {
            case 'spotify-this-song':
                rockOutAlone();
                break;
            case "movie-this":
                noAttentionSpanForThat()
                break;
            case 'concert-this':
                rockOutLive();
                break;
            default:
                console.log("YA DONE GOOFED FAM");
                break;
        }
      });
}