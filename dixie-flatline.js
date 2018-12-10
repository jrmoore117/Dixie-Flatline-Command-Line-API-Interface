// require node modules for api requests

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
console.log("Spotify ID: " + spotify.id + ", Spotify Secret: " + spotify.secret + ".");

// Declare global variables for currentAPI and userQueryTerms
var currentAPI = "";
var userQueryTerms = "";

// Console log opening message from Dixie to console
console.log("========================================")
console.log("Dixie: Hey, Case. What can I do for ya?");
console.log("========================================")

// begin a new prompt
inquirer.prompt([
    {
        type: "list",
        message: "Case: Dixie, I need you to...",
        choices: ["look up a song.", "find some concert info.", "look up a movie."],
        name: "searchType"
    }
// .then
]).then(function(response){
    // assign chosen API to currentAPI variable
    currentAPI = response.searchType;

    console.log(currentAPI);

    // new prompt
        // type: list
        // message asking user to pick what to do
        // choices: spotify, bands in town, omdb
        // name
})
// .then
    // assign search terms to userQueryTerms variable
    // switch-case statment
        // case: spotify
            // query spotify api
            // console log parsed response
                // .then
                    // new prompt
                        // type: confirm
                        // message asking user if they want another search
                        // name
                    // .then
                        // if confirm = true
                            // call dixie flatline function again
                        // else
                            // end program
        // case: bands in town
            // query bands in town api
            // console log parsed response
                // see lines 41-50
        // case: omdb
            // query omdb api
            // console log parsed response
                // see lines 41-50
