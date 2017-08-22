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

//var vtweetdisp = [];

		
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
					//console.log(data);
					//console.log(data.tracks.items);
					//Song name
					console.log(data.tracks.items[0].name);
					//album song is from
					console.log(data.tracks.items[0].album.name);
					//link of the song
					console.log(data.tracks.items[0].external_urls.spotify);
					//artist's name
					console.log(data.tracks.items[0].artists[0].name);
					//data.forEach(function(user){
					//	console.log(user.tracks.items);
					//});
				}
			});
	

if (vaction == "my-tweets") {
	vatweet.get('statuses/user_timeline', { screen_name: 'HC056', count: 20 }, function(error, tweets, response){
  		if (!error) {
    		//console.log(tweets);
    		tweets.forEach(function(user) {
    			//var vuserobj = {
    			//	date: user.created_at,
    			//	twit: user.text
    			//};
    			//vtweetdisp.push(vuserobj);
    			console.log(chalk.yellow.bold("Tweeted: ") + chalk.bgCyan(user.text) + chalk.blue.bold(" On: ") + chalk.bgCyan(user.created_at));
    		});
    		//console.log(vtweetdisp);
  		}
	});
}	else if (vaction == "spotify-this-song") {

			



	}
	else if (vaction == "movie-this") {

	}
	else if (vaction == "do-what-it-says") {

	}
