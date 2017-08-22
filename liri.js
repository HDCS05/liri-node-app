var vskey = require("./keys.js");
var vtwitpack = require("twitter");
var vspotpack = require("node-spotify-api");
var vrequest = require("request");
const chalk = require("chalk");
var vatweet = new vtwitpack(vskey.twitterKeys);
var vaspot = new vspotpack(vskey.spotifyKeys);
var nodeArgs = process.argv; 
var vaction = process.argv[2];
var vsongname = "";
var vmoviename = "";

//var vtweetdisp = [];


		

			for (var i = 2; i < nodeArgs.length; i++) {
				if (i > 2 && i < nodeArgs.length) {
					vmoviename = vmoviename + "+" + nodeArgs[i];
				}	else {
    					vmoviename += nodeArgs[i];
					}
			}
			if (vmoviename.length == 0) {
				vmoviename = "Mr. Nobody";
			}
			var queryUrl = "https://www.omdbapi.com/?t=" + vmoviename + "&y=&plot=short&apikey=40e9cece";
			//console.log(queryUrl);
			vrequest(queryUrl, function(error, response, body) {
				// If the request is successful
				if (!error) {
					console.log(chalk.yellow.bold("Movie Title: ") + chalk.bgBlue(JSON.parse(body).Title));
					console.log(chalk.yellow.bold("Released In: ") + chalk.bgBlue(JSON.parse(body).Year));
					console.log(chalk.yellow.bold("IMDB Rating: ") + chalk.bgBlue(JSON.parse(body).Ratings[0].Value));
					console.log(chalk.yellow.bold("Rotten Tomatoes Rating: ") + chalk.bgBlue(JSON.parse(body).Ratings[1].Value));
					console.log(chalk.yellow.bold("Country: ") + chalk.bgBlue(JSON.parse(body).Country));
					console.log(chalk.yellow.bold("Language: ") + chalk.bgBlue(JSON.parse(body).Language));
					console.log(chalk.yellow.bold("Plot: ") + chalk.bgBlue(JSON.parse(body).Plot));
					console.log(chalk.yellow.bold("Actors in the Movie: ") + chalk.bgBlue(JSON.parse(body).Actors));
				}
			});

	

if (vaction == "my-tweets") {

	vatweet.get('statuses/user_timeline', { screen_name: 'HC056', count: 20 }, function(error, tweets, response){
  		if (!error) {
    		//console.log(tweets);
    		tweets.forEach(function(user) {
    			
    			console.log(chalk.yellow.bold("Tweeted: ") + chalk.bgCyan(user.text) + chalk.blue.bold(" On: ") + chalk.bgCyan(user.created_at));
    		});
  		}
	});

}	else if (vaction == "spotify-this-song") {

		for (var i = 3; i < nodeArgs.length; i++) {
				if (i > 3 && i < nodeArgs.length) {
					vsongname = vsongname + "+" + nodeArgs[i];
				}	else {
						vsongname += nodeArgs[i];
					}
			}
			if (vsongname.length == 0) {
				vsongname = "The+Sign+Ace+Of+Base";
			}
			vaspot.search({ type: 'track', query: vsongname, limit: '1' }, function(err, data) {
				if (!err) {
					//Song name
					console.log(chalk.yellow.bold("Song Name: ") + chalk.bgGreen(data.tracks.items[0].name));
					//album song is from
					console.log(chalk.yellow.bold("Song From The Album: ") + chalk.bgGreen(data.tracks.items[0].album.name));
					//link of the song
					console.log(chalk.yellow.bold("Link to the Song in Spotify: ") + chalk.bgGreen(data.tracks.items[0].external_urls.spotify));
					//artist's name
					console.log(chalk.yellow.bold("Artist Name: ") + chalk.bgGreen(data.tracks.items[0].artists[0].name));
				}
			});	

	}
	else if (vaction == "movie-this") {

	}
	else if (vaction == "do-what-it-says") {

	}
