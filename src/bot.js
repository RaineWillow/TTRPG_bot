const Discord = require("discord.js");
manager = require("./games_manager.js");

function newgame(args, message) {
	if (manager.createGame(message.guild.id, args[1], args[0])) {
		return `The game ${args[0]} was created successfully!`;
	} else {
		return `There is already a game bound to this server! Unbind to resolve!`;
	}
}

function ping(args, message) {
	return "pong";
}

function sum(args, message) {
	const numArgs = args.map(x => parseFloat(x));
	const sum = numArgs.reduce((counter, x) => counter += x);
	return `The sum of all the arguments you provided is ${sum}!`;
}

function dev(args, message) {
	if (args[0] === "list") {
		let gList = manager.getGames();
		let outString = "";
		Object.keys(gList).forEach(key => {
			outString += key + " " + gList[key]._name + "\n";
		});
		return outString;
	}
}

module.exports = {

	'dev': {invoke: dev, minArgs: 1},

	'ping': {invoke: ping, minArgs: 0},

	'sum': {invoke: sum, minArgs: 1},

	'newgame': {invoke: newgame, minArgs: 2}

};
