// Require .env file
require("dotenv").config();

// Require inquirer module
var inquirer = require("inquirer");

var spotifyImport = require("./keys.js");

function Spotify(id, secret) {
    this.id = id,
    this.secret = secret
}

var spotify = new Spotify(spotifyImport.spotify.id, spotifyImport.spotify.secret);

console.log("Spotify ID: " + spotify.id + ", Spotify Secret: " + spotify.secret + ".");

