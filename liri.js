var vskey = require("./keys.js");
var vtwitpack = require("twitter");
var vspotpack = require("node-spotify-api");
var vrequest = require("request");
var vfs = require("fs");
const chalk = require("chalk");
var vatweet = new vtwitpack(vskey.twitterKeys);
var vaspot = new vspotpack(vskey.spotifyKeys);
var nodeArgs = process.argv; 
var vaction = process.argv[2];
var vsongname = "";
var vmoviename = "";


if (vaction == "my-tweets") {
	ftweets();
}	else if (vaction == "spotify-this-song") {
		fspotsong();
	}	
	else if (vaction == "movie-this") {
		fmovie();
	}
	else if (vaction == "do-what-it-says") {
		freadtext();
	}

function ftweets() {

	//vatweet.get('statuses/user_timeline', { screen_name: 'HC056', count: 20 }, function(error, tweets, response){
	vatweet.get('statuses/home_timeline', { count: 20 }, function(error, tweets, response){
  		if (!error) {
    		//console.log(tweets);
    		tweets.forEach(function(user) {
    			console.log(chalk.yellow.bold("Tweet on timeline: ") + chalk.bgCyan(user.text) + chalk.red.bold(" Tweeted On: ") + chalk.bgMagenta(user.created_at));
    		});
  		}
	});

};

function fspotsong () {

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
			//console.log(data.tracks.items);
			//Song name
			console.log(chalk.yellow.bold("Song Name: ") + chalk.bgGreen(data.tracks.items[0].name));
			//album song is from
			console.log(chalk.yellow.bold("Song From The Album: ") + chalk.bgGreen(data.tracks.items[0].album.name));
			//link of the song
			console.log(chalk.yellow.bold("Link to Preview the Song: ") + chalk.bgGreen(data.tracks.items[0].preview_url));
			//console.log(chalk.yellow.bold("Link to the Song in Spotify: ") + chalk.bgGreen(data.tracks.items[0].external_urls.spotify));
			//artist's name
			console.log(chalk.yellow.bold("Artist Name: ") + chalk.bgGreen(data.tracks.items[0].artists[0].name));
		}
	});	

};

function fmovie () {

	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {
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
			//console.log(JSON.parse(body));
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

};

function freadtext() {

	vfs.readFile("random.txt", "utf8", function(error, data) {
		// We will then print the contents of data
		console.log(data);
		// Then split it by commas (to make it more readable)
		var dataArr = data.split(",");
		//display the data as an array
		//console.log(dataArr);
		if (dataArr[0] == "my-tweets") {
			ftweets();
		}	else if (dataArr[0] == "spotify-this-song") {
				vsongname = fmytrim(dataArr[1]);
				//console.log(vsongname);
				fspotsong();
			}
			else if (dataArr[0] == "movie-this") {
				vmoviename = fmytrim(dataArr[1]);
				//console.log(vmoviename);
				fmovie();
			}
	});

};

function fmytrim(x) {

    return x.replace(/^\s+|\s+$/gm,'');

};
