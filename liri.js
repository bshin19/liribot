require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var nodeArgs = process.argv;
var lirireq = nodeArgs[2];
nodeArgs = nodeArgs.splice(3).join("+");

function twitterCall() {
    client.get('statuses/user_timeline', {
        screen_name: "@bradyshinners",
        q: 'node.js',
        count: 20
    }, function (error, tweets, response) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log("Posted on " + tweets[i].created_at);
        };
    });
};

function movieCall() {
    if (!nodeArgs) {
        nodeArgs = "Mr. Nobody";
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + nodeArgs + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            var mov = JSON.parse(body);

            // * Title of the movie.
            console.log(mov.Title);
            // * Year the movie came out.
            console.log("Release Year: " + mov.Year);
            // * IMDB Rating of the movie.
            console.log("IMDB's rating: " + mov.imdbRating);
            // * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes' Rating: " + mov.Ratings[0].Value);
            // * Country where the movie was produced.
            console.log("Proudly produced in the " + mov.Country);
            // * Language of the movie.
            console.log("Available in these languages: " + mov.Language);
            // * Plot of the movie.
            console.log(mov.Plot);
            // * Actors in the movie.
            console.log(mov.Actors);

        };
    });
};

function spotReturn() {
    //verify if user supplied an argument or not

    if (!nodeArgs) {
        nodeArgs = "Ace of Base The Sign"
    };
    spotify.search({ type: 'track', query: nodeArgs }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        };
        var thisSong = data.tracks.items[0];

        // Artist(s)
        var artists = "Artist[s]: ";
        for (var i = 0; i < thisSong.album.artists.length; i++) {
            artists += thisSong.album.artists[i].name;
        };
        console.log(artists);

        // The song's name
        console.log("The Song's name is: " + thisSong.name);

        // A preview link of the song from Spotify
        console.log("Listen here: " + thisSong.external_urls.spotify);

        // The album that the song is from
        console.log("Album: " + thisSong.album.name);
    });
};

function liriSwitch() {
    switch (lirireq) {
        //Displays last 20 tweets and when they were created in the term/bash window
        case "my-tweets":
            twitterCall();
            break;

        //Displays information about a song - artist, song's name, spotify preview, album of song
        //If no song is searched, the song will default to "The Sign" by Ace of Base
        case "spotify-this-song":
            spotReturn();
            break;

        case "movie-this":
            movieCall();
            break;

        case "do-what-it-says":
            fs.readFile("random.txt", 'utf8', function (err, data) {
                if (err) {
                    return err;
                };
                //splits the CSVs - comma separated values 
                var dataSplit = data.split(",")
                lirireq = dataSplit[0];
                nodeArgs = dataSplit[1];
                liriSwitch();
            });
            break;
    };
};

liriSwitch();