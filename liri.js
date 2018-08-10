require("dotenv").config();
var fs = require("fs");
var request = require("request");
var apiKeys = require("./keys");
var logFile = "log.txt";


var Spotify = require("node-spotify-api");
var spotify = new Spotify(apiKeys.spotify);
var Twitter = require("twitter");
var client = new Twitter(apiKeys.twitter);

var command = process.argv[2];
var search = process.argv[3];

if (command == "my-tweets") {
    myTweets();
}

if (command == "spotify-this-song") {
    spotifyThisSong(search);
}

if (command == "movie-this") {
    movieThis(movieSearch);
}

if (command == "do-what-it-says") {
    doWhatItSays();
}

function myTweets() {
    var params = {
        screenName: "realDonaldTrump"
    }

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length && i < 20; i++) {
                console.log(tweets[i].text);
                console.log("tweeted on " + tweets[i].created_at);
                fs.appendFile(logFile, "n\ \n" + tweets[i].text + "\n tweeted on " + tweets[i].created_at + "n\ \n", function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
    });
}

function spotifyThisSong(song) {
    var song = search;
    if (process.argv.length < 4) {
        song = "Never Gonna Give You Up";
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            var trackSearch = data.tracks.items[0];
            console.log("The artist name is " + trackSearch.artists[0].name);
            console.log("The song name is " + trackSearch.name);
            console.log("The preview link is " + trackSearch.preview_url);
            console.log("The song is from track " + trackSearch.track_number + " from the album " + trackSearch.album.name);
            fs.appendFile(logFile, "n\ \nThe artist name is " + trackSearch.artists[0].name + "\nThe song name is " + trackSearch.name + "\nThe preview link is " + trackSearch.preview_url + "\nThe song is from track " + trackSearch.track_number + " from the album " + trackSearch.album.name + "n\ \n", function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
};

function movieThis(movieSearch) {
    var movieSearch = search;
    if (process.argv.length < 4) {
        movieSearch = "Up";
    }
    request("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("The movie's title is " + JSON.parse(body).Title);
            console.log("The movie was released in " + JSON.parse(body).Year);
            console.log("The movie's imdb rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie was produced in " + JSON.parse(body).Country);
            console.log("The movie language is " + JSON.parse(body).Language);
            console.log("The movie plot is " + JSON.parse(body).Plot);
            console.log("The movie plot is " + JSON.parse(body).Actors);
            fs.appendFile(logFile, "\n \nThe movie's title is " + JSON.parse(body).Title + "\nThe movie was released in " + JSON.parse(body).Year + "\nThe movie's imdb rating is: " + JSON.parse(body).imdbRating + "\nThe movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value + "\nThe movie was produced in " + JSON.parse(body).Country + "\nThe movie language is " + JSON.parse(body).Language + "\nThe movie plot is " + JSON.parse(body).Plot + "\nThe movie plot is " + JSON.parse(body).Actors + "n\ \n", function (err) {
                if (err) {
                    console.log(err);
                }
            });            
        }
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        var song = (dataArr[1]);
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            else {
                var trackSearch = data.tracks.items[0];
                console.log("The artist name is " + trackSearch.artists[0].name);
                console.log("The song name is " + trackSearch.name);
                console.log("The preview link is " + trackSearch.preview_url);
                console.log("The song is from track " + trackSearch.track_number + " from the album " + trackSearch.album.name);
                fs.appendFile(logFile, "n\ \nThe artist name is " + trackSearch.artists[0].name + "\nThe song name is " + trackSearch.name + "\nThe preview link is " + trackSearch.preview_url + "\nThe song is from track " + trackSearch.track_number + " from the album " + trackSearch.album.name + "n\ \n", function (err) {
                    if (err) {
                        console.log(err);
                    }
                });    
            }
        })
    })
};