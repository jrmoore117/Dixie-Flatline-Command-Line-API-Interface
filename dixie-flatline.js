// require node modules for api requests
var request = require("request");
var Spotify = require("node-spotify-api");
var moment = require("moment");

// Require .env file
require("dotenv").config();

// Require inquirer module for terminal user interface
var inquirer = require("inquirer");

// Import spotify API key
var spotifyImport = require("./keys.js");

var spotify = new Spotify({
    id: spotifyImport.spotify.id,
    secret: spotifyImport.spotify.secret
});

// console.log("Spotify ID: " + spotifyImport.spotify.id + ", Spotify Secret: " + spotifyImport.spotify.secret + ".");

// Declare global variables for currentAPI and userQueryTerms
var currentQueryType = "";
var userQueryTerms = "";

// Console log opening message from Dixie to console
console.log("=========================================");
console.log('Dixie: "Hey, Case. What can I do for ya?"');
console.log("=========================================");

function askDixie() {
    // begin a new prompt
    inquirer.prompt([
        {
            type: "list",
            message: 'Case: "Dixie, I need you to..."',
            choices: ["look up a song.", "find some concert info.", "look up a movie."],
            name: "searchType"
        }
        // .then
    ]).then(function (response) {
        // assign chosen API to currentAPI variable
        currentQueryType = response.searchType;
        // console.log(currentQueryType);

        switch (currentQueryType) {
            case "look up a song.":
                console.log("================================================================");
                console.log("Dixie: \"Okay, I'll " + currentQueryType + " What's the name of the song?\"");
                console.log("================================================================");
                break;
            case "find some concert info.":
                console.log("===============================================================================================");
                console.log("Dixie: \"Okay, I'll " + currentQueryType + " What's the name of music artist you're lookin' for?\"");
                console.log("===============================================================================================");
                break;
            case "look up a movie.":
                console.log("====================================================================");
                console.log("Dixie: \"Okay, I'll " + currentQueryType + " What's the movie you wanna see?\"");
                console.log("====================================================================");
                break;
        }

        // new prompt
        inquirer.prompt([
            {
                type: "input",
                message: 'Case: "Thanks, Dix. The name is..."',
                name: "searchTerms"
            }

            // .then
        ]).then(function (response) {
            // assign search terms to userQueryTerms variable
            userQueryTerms = response.searchTerms;
            // console.log(userQueryTerms);

            console.log("=============================");
            console.log("Dixie: \"I'm on it, Case.\"");
            console.log("=============================");

            // switch-case statment
            switch (currentQueryType) {
                case "look up a song.":
                    // query spotify api

                    if(userQueryTerms === ""){
                        userQueryTerms = "we're finally landing"
                    }

                    spotify.search({ type: 'track', query: userQueryTerms }, function (err, data) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        
                        console.log("Dixie: \"Here's what I found.\"");
                        console.log("=============================");
                        console.log("Artist: " + data.tracks.items[0].artists[0].name);
                        console.log("Album: " + data.tracks.items[0].album.name);
                        console.log("Song: " + data.tracks.items[0].name);
                        console.log("Preview: " + data.tracks.items[0].preview_url);
                        console.log("============================================");

                        restartDixie();
                    });

                    // console log parsed response
                    // see above
                    break;
                case "find some concert info.":
                    
                    if(userQueryTerms === ""){
                        userQueryTerms = "tycho"
                    }
                
                    // query bands in town api

                    var options = {
                        url: "https://rest.bandsintown.com/artists/" + userQueryTerms + "/events?app_id=codingbootcamp",
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Accept-Charset': 'utf-8',
                            'User-Agent': 'my-reddit-client'
                        }
                    };

                    request(options, function (error, response, body) {
                        if (error) {
                            console.log("Dixie: \"Sorry, bud. No luck.\"");
                            return console.log("=============================");
                            // return console.log("Error: " + error);
                        }

                        // console log parsed response
                        var json = JSON.parse(body);

                        if (json.length < 1) {
                            console.log("Dixie: \"Sorry, bud. No luck.\"");
                            console.log("=============================");
                        } else if (json.errorMessage) {
                            console.log("Dixie: \"Sorry, bud. No luck.\"");
                            console.log("=============================");
                        } else if (json[0].venue.name && json[0].venue.city && json[0].datetime) {
                            console.log("Dixie: \"Here's what I found.\"");
                            console.log("=============================");
                            console.log("Venue: " + json[0].venue.name);
                            console.log("Location : " + json[0].venue.city);
                            console.log("Date : " + json[0].datetime);
                            console.log("============================================");
                        } else {
                            console.log("Dixie: \"Sorry, bud. No luck.\"");
                            console.log("=============================");
                        }

                        restartDixie();
                    });
                    break;
                case "look up a movie.":
                    
                    if(userQueryTerms === ""){
                        userQueryTerms = "the matrix"
                    }
                
                    // query omdb api

                    var options = {
                        url: "http://www.omdbapi.com/?apikey=trilogy&t=" + userQueryTerms,
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Accept-Charset': 'utf-8',
                            'User-Agent': 'my-reddit-client'
                        }
                    };

                    request(options, function (error, response, body) {
                        if (error) {
                            console.log("Dixie: \"Sorry, bud. No luck.\"");
                            return console.log("=============================");
                            // return console.log("Error: " + error);
                        }

                        var json = JSON.parse(body);

                        console.log("Dixie: \"Here's what I found.\"");
                        console.log("=============================");
                        console.log("Title: " + json.Title);
                        console.log("Release Year: " + json.Year);
                        console.log("IMDB Rating: " + json.Ratings[0].Value);
                        console.log("Rotten Tomatoes Rating: " + json.Ratings[1].Value);
                        console.log("Country: " + json.Country);
                        console.log("Language: " + json.Language);
                        console.log("Plot: " + json.Plot);
                        console.log("Actors: " + json.Actors);
                        console.log("============================================");

                        restartDixie();
                    });
                    break;
            }
        })
    })
}

function restartDixie() {
    // new prompt
    inquirer.prompt([
        {
            type: "confirm",
            message: "Dixie: \"Anything else you need, Case?\"",
            name: "searchAgain"
        }
    ]).then(function (response) {
        var confirm = response.searchAgain;
        // console.log(confirm);

        if (confirm) {
            console.log("============================================");
            // Start new session with Dixie
            askDixie();
        } else {
            // end program
            console.log("============================================");
            console.log("Dixie: \"Okay, talk to ya later, bud.\"");
            return console.log("=====================================");
        }
    })
}

askDixie();