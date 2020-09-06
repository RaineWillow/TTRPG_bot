const Discord = require("discord.js");
manager = require("./games_manager.js");

//tells the manager to bind the Discord server to the game
function newgame(args, message) {
	let error = manager.createGame(message.guild.id, args[1], args[0]);
	return error.message;
}

//tells the manager to unbind the Discord server from the game
function unbind(args, message) {
	let error = manager.unbind(message.guild.id);
	return error.message;
}

//new Functions added here


//the dev function contains useful debugging features; TODO: Restrict usage to user ids found in the data.json file
function dev(args, message) {
	if (args[0] === "list") {
		let gList = manager.getGames();
		let outString = "";
		Object.keys(gList).forEach(key => {
			outString += key + " " + gList[key]._name + "\n";
		});
		if (outString === "") {
			return "No games!";
		}
		return outString;
	}
}

//ping function to test bot
function ping(args, message) {
	return "pong";
}

module.exports = {

	'newgame': {invoke: newgame, minArgs: 2},

	'unbind': {invoke:unbind, minArgs: 0},

	//new functions added here!

	'dev': {invoke: dev, minArgs: 1},

	'ping': {invoke: ping, minArgs: 0}

};
