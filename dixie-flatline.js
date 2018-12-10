// require node modules for api requests
var request = require("request");
var spotifyAPI = require("node-spotify-api");
var moment = require("moment");

// Require .env file
require("dotenv").config();

// Require inquirer module for terminal user interface
var inquirer = require("inquirer");

// Import spotify API key
var spotifyImport = require("./keys.js");

function Spotify(id, secret) {
    this.id = id,
    this.secret = secret
}

var spotify = new Spotify(spotifyImport.spotify.id, spotifyImport.spotify.secret);
// console.log("Spotify ID: " + spotify.id + ", Spotify Secret: " + spotify.secret + ".");

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
]).then(function(response){
    // assign chosen API to currentAPI variable
    currentQueryType = response.searchType;
    // console.log(currentQueryType);

    switch(currentQueryType) {
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
    ]).then(function(response) {
        // assign search terms to userQueryTerms variable
        userQueryTerms = response.searchTerms;
        // console.log(userQueryTerms);
        
        console.log("=============================");
        console.log("Dixie: \"I'm on it, Case.\"");
        console.log("=============================");

        // switch-case statment
        switch(currentQueryType){
            case "look up a song.":
                // query spotify api
                // console log parsed response
                    // see above
                break;
            case "find some concert info.":
                // query bands in town api

                const options = {  
                    url: "https://rest.bandsintown.com/artists/" + userQueryTerms + "/events?app_id=codingbootcamp",
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Accept-Charset': 'utf-8',
                        'User-Agent': 'my-reddit-client'
                    }
                };

                request(options ,function(error, response, body){
                    if(error){
                        console.log("Dixie: \"Sorry, bud. No luck.\"");
                        return console.log("=============================");
                        // return console.log("Error: " + error);
                    }

                    console.log("Dixie: \"Here's what I found.\"");
                    console.log("=============================");
                    
                    if(json[0].venue.name && json[0].venue.city && json[0].venue.datetime){
                        // console log parsed response
                        var json = JSON.parse(body);
                        console.log("Venue: " + json[0].venue.name);
                        console.log("Location : " + json[0].venue.city);
                        console.log("Date : " + json[0].datetime);
                        console.log("============================================");
                    } else {
                        console.log("Dixie: \"Sorry, bud. No luck.\"");
                        return console.log("=============================");
                    }

                    restartDixie();
                });
                break;
            case "look up a movie.":
                // query omdb api
                // console log parsed response
                    // see above
                break;
        }
        
    })
    
})
}

function restartDixie(){
    // new prompt
    inquirer.prompt([
        {
            type: "confirm",
            message: "Dixie: \"Anything else you need, Case?\"",
            name: "searchAgain"
        }
    ]).then(function(response) {
        var confirm = response.searchAgain;
        // console.log(confirm);
        
        if(confirm) {
            console.log("============================================");
            // Start new session with Dixie
            askDixie();
        } else {
            console.log("============================================");
            console.log("Dixie: \"Okay, talk to ya later, bud.\"");
            return console.log("======================================");
        }
            // end program
    })
}

askDixie();