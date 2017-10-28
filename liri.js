// pull the action from terminal
const action = process.argv[2];
const nodeArg = process.argv;

// ------------twitter--------------
// good habit to capitalize the const of whatever is being pulled externally
const Twitter = require('twitter');
// pulling twitter keys from twitkeys.js and storing as variable 'twitKeys'
const twitKeys = require('./twitkeys.js');
// 'Twitter' must be used after declaring 'twitKeys' & called outside of the function
let client = new Twitter(twitKeys);

// ------------spotify--------------
// good habit to capitalize the const of whatever is being pulled externally
const Spotify = require('node-spotify-api');
// pulling spotify keys from spotkeys.js and storing as variable 'spotKeys'
const spotKeys = require('./spotkeys.js');
// 'Spotify' must be used after declaring 'spotKeys' & called outside of the function. we are tying the module with spotKeys
let spotify = new Spotify(spotKeys);

// if the song title is more than one word
let songName = '';

for (var i = 3; i < nodeArg.length; i++) {
	if (i > 3 && i < nodeArg.length) {
		songName = songName + '+' + nodeArg[i];
	} else {
		songName = nodeArg[i];
	}
}

// ------------omdb--------------
// good habit to capitalize the const of whatever is being pulled externally
const Request = require('request');

const omdbKey = require('./omdbkey.js');

let movieName = '';

for (var j = 3; j < nodeArg.length; j++) {
	if (j > 3 && j < nodeArg.length) {
		movieName = movieName + '+' + nodeArg[j];
	} else {
		movieName = nodeArg[j];
	}
}
// console.log(movieName);
// ------------fs--------------
const fs = require('fs');

// let random = '';

// ------------switch/case statements--------------
switch (action) {
case 'my-tweets':
	myTweets();
	break;
case 'spotify-this-song':
	spotifyThisSong();
	break;
case 'movie-this':
	movieThis();
	break;
case 'do-what-it-says':
	doWhatItSays();
	break;
}

// ------------twitter--------------
// display latest 20 tweets
function myTweets () {
	client.get('statuses/user_timeline', { screen_name: '12345679787', count: '20' }, function (error, tweets, response) {
		if (error) throw error;  // difference of throw vs return?
		// console.log(tweets.length);
		for (var i = 0; i < tweets.length; i++) {
			console.log('----------------------------------------');
			console.log('');
			console.log(tweets[i].text);
			console.log('');
		}
	});
}

// ------------spotify--------------

function spotifyThisSong () {
	// keyword is used to search artist, album, etc. why?
	
	spotify.search({ type: 'track', query: songName, limit: '20' }, function (error, data) {
		if (error) {
			console.log('------------------error------------------');
			console.log('');
			console.log('artist: Ace of Base');
			console.log('song: The Sign');
			console.log('preview link: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=ef5a2d6c5b4d4b17b6c005c67c7b1027');
			console.log('album: The Sign (US Album) [Remastered]');
			console.log('');
			return console.log(error);
		};
		// console.log(data);
		// console.log(data.tracks);
		// console.log(data.tracks.items);
		for (var i = 0; i < data.tracks.items.length; i++) {
			console.log('----------------------------------------');
			console.log('');
			console.log('artist: ' + data.tracks.items[i].artists[0].name);
			console.log('song: ' + data.tracks.items[i].name);
			console.log('preview link: ' + data.tracks.items[i].preview_url);
			console.log('album: ' + data.tracks.items[i].album.name);
			console.log('');
		}
	});
}

// ------------omdb--------------

function movieThis () {
	Request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=' + movieName, function (error, response, body) {
		if (error) {
			console.log('----------------------------------------');
			console.log('');
			console.log('Title: Mr. Nobody');
			console.log('Year: 2009');
			console.log('IMDB Rating: 7.9/10');
			console.log('Rotten Tomatoes Rating: 66%');
			console.log('Country Produced: Belgium, Germany, Canada, France, USA, UK');
			console.log('Language: English, Mohawk');
			console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
			console.log('Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham');
			console.log('');
			return console.log(error);
		} else {
			console.log('----------------------------------------');
			console.log('');
			console.log('Title: ' + JSON.parse(body).Title);
			console.log('Year: ' + JSON.parse(body).Year);
			console.log('IMDB Rating: ' + JSON.parse(body).Ratings[0].Value);
			console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
			console.log('Country Produced: ' + JSON.parse(body).Country);
			console.log('Language: ' + JSON.parse(body).Language);
			console.log('Plot: ' + JSON.parse(body).Plot);
			console.log('Actors: ' + JSON.parse(body).Actors);
			console.log('');
		}
		// console.log('error:', error); // Print the error if one occurred
		// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	});
}

// ------------fs--------------

let what = [];
// let newWord = '';

function doWhatItSays () {
	fs.readFile('random.txt', 'utf8', function (error, data) {
		if (error) {
			return error;
		} else {
			what = data.toString().split(',');
			// console.log('total phrase:', what);
			// removes the outside quotes
			what[1] = what[1].replace(/^"(.*)"$/, '$1');
			// console.log('name:', what[1]);
			// console.log('current length:', what[1].length);
			// combines the individual characters into a string
			what[1] = what[1].split();
			// console.log('new length array:', what[1].length);
			// console.log('new name array:', what[1]);
			if (what[0] === 'spotify-this-song') {
				// good habit to capitalize the const of whatever is being pulled externally
				const Spotify = require('node-spotify-api');
				// pulling spotify keys from spotkeys.js and storing as variable 'spotKeys'
				const spotKeys = require('./spotkeys.js');
				// 'Spotify' must be used after declaring 'spotKeys' & called outside of the function. we are tying the module with spotKeys
				spotify = new Spotify(spotKeys);
				songName = '';
				for (var i = 0; i < what[1].length; i++) {
					if (i > 0 && i < what[1].length) {
						songName = songName + '+' + what[1][i];
					} else {
						songName = what[1][i];
					}
				}
				spotifyThisSong();
			} else if (what[0] === 'my-tweets') {
				// good habit to capitalize the const of whatever is being pulled externally
				const Twitter = require('twitter');
				// pulling twitter keys from twitkeys.js and storing as variable 'twitKeys'
				const twitKeys = require('./twitkeys.js');
				// 'Twitter' must be used after declaring 'twitKeys' & called outside of the function
				client = new Twitter(twitKeys);
				myTweets();
			} else if (what[0] === 'movie-this') {
				// console.log(what[1]);

				// turn array into string
				let movie = what[1].toString();
				// split string by space. if i don't do this, why does the for loop, loop by character and not word?
				movie = movie.split(' ');
				// let movie = what[1].join();  // this results in the same as .toString(). why?
				// console.log('movie:', movie);
				// console.log('length:', movie.length);
				movieName = '';
				// console.log('movie name:', what[1]);
				// movieName = what[1].join();
				// console.log('movie name:', movieName);
				for (var j = 0; j < movie.length; j++) {
					if (j > 0 && j < movie.length) {
						movieName = movieName + '+' + movie[j];
					} else {
						movieName = movie[j];
					}
				}
				// console.log('movie name:', movieName);
				movieThis();
			}
		}
	});
}


