const Discord = require("discord.js");
let manager = require("./game_manager.js");

//tells the manager to create a game and bind the Discord server to it
function newGame(args, message) {
	let result = manager.createGame(message.guild.id, message.author.id, args[1], args[0]);
	return result.message;
}

//function load(args, message) {

//}

//tells the manager to unbind the Discord server from the game
function unbind(args, message) {
	let result = manager.unbind(message.guild.id);
	return result.message;
}

//adds a battlemap to the game in question
function createBattlemap(args, message) {
	let result = manager.checkGame(message.guild.id);
	if (!result.success) {
		return result.message;
	} else {
		let result2 = manager.games[message.guild.id].createBattlemap(args[0], message);
		return result2.message;
	}
}

//removes a battlemap from the game
function deleteBattlemap(args, message) {
	let result = manager.checkGame(message.guild.id);
	if (!result.success) {
		return result.message;
	} else {
		let result2 = manager.games[message.guild.id].deleteBattlemap(args[0], message);
		return result2.message;
	}
}

//a command to create an entity
function createEntity(args, message) {
	let result = manager.checkGame(message.guild.id);
	if (!result.success) {
		return result.message;
	} else {
		let result2 = manager.games[message.guild.id].createEntity(args[0], message);
		return result2.message;
	}
}

//a command to delete an entity
function deleteEntity(args, message) {
	let result = manager.checkGame(message.guild.id);
	if (!result.success) {
		return result.message;
	} else {
		let result2 = manager.games[message.guild.id].deleteEntity(args[0], message);
		return result2.message;
	}
}

//new Functions added here


//the dev function contains useful debugging features; TODO: Restrict usage to user ids found in the data.json file; TODO: This is a dev tool,
//so being a little messy is fine, but if it gets too bad, setting up a system for dev commands is a must
function dev(args, message) {
	if (args[0] === "list") {
		let gList = manager.getGames();
		let outString = "";
		Object.keys(gList).forEach(key => {
			outString += key + ":\n" + gList[key].name + ",\n" + gList[key].owner + "\n\n";
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

	'newgame': {invoke: newGame, minArgs: 2},

	//'loadgame':{invoke: loadGame, minArgs: X},

	'unbind': {invoke:unbind, minArgs: 0},

	'createbattlemap': {invoke:createBattlemap, minArgs: 1},

	'deletebattlemap': {invoke: deleteBattlemap, minArgs: 1},

	'createentity': {invoke: createEntity, minArgs: 1},

	'deleteentity': {invoke: deleteEntity, minArgs: 1},

	//new functions added here!

	'dev': {invoke: dev, minArgs: 1},

	'ping': {invoke: ping, minArgs: 0}

};
