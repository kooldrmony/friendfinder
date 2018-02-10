// Pull in required dependencies
var path = require('path');

// Import the list of friend entries
var newFriends = require('../data/friend.js');

// Export API routes
module.exports = function(app) {

	// Get request for the api/friend page
	app.get('/api/friend', function(req, res) {
		res.json(newFriends);
	});

	// This section is supposed to take the user information and post a new query to the api/friend page.
	app.post('/survey', function(req, res) {
		// Capture the user input object
		var userInput = req.body;
		

		var userResponses = userInput.scores;


		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < newFriends.length; i++) {
	

			
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(newFriends[i].scores[j] - userResponses[j]);
			}
			

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				

				totalDifference = diff;
				matchName = newFriends[i].name;
				matchImage = newFriends[i].photo;
			}
			newFriends.push(userInput);
		}

		// Add new user
		//newFriends.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};