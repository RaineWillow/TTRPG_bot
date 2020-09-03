const Discord = require("discord.js");

function ping(args) {
	return "pong";
}

function sum(args) {
	const numArgs = args.map(x => parseFloat(x));
	const sum = numArgs.reduce((counter, x) => counter += x);
	return `The sum of all the arguments you provided is ${sum}!`;
}

module.exports = {
	'ping': {invoke: ping, minArgs: 0},

	'sum': {invoke: sum, minArgs: 1}
};
